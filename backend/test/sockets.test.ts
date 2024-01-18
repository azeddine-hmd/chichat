import request from 'supertest';
import { app, server } from '../src/app';
import { io } from '../src/api/sockets/socket';
import { io as ioc, type Socket as ClientSocket } from 'socket.io-client';
import { AddressInfo } from 'net';
import { Socket } from 'socket.io';
import { prisma } from '../src/config';
import { LoginDto } from '../src/api/auth/types/dto/login-dto';

describe('test socket connection', () => {
  let clientSocket: ClientSocket;
  let serverSocket: Socket;

  beforeAll((done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        email: 'test1@test.com',
        password: '1649253689_Q',
      } as LoginDto)
      .set('Accept', 'application/json')
      .then((res) => {
        server.listen(() => {
          const port = (server.address() as AddressInfo).port;
          clientSocket = ioc(`http://localhost:${port}`, {
            transports: ['websocket'],
            withCredentials: true,
            extraHeaders: {
              Cookie: res.header['set-cookie'][0],
            },
          });
          io.on('connection', (socket) => {
            serverSocket = socket;
          });
          clientSocket.on('connect', done);
          clientSocket.on('error', (err) => {
            console.log(`connection error: ${err}`);
            done();
          });
        });
      });
  });

  afterAll(() => {
    prisma.$disconnect();
    io.close();
    clientSocket.close();
  });

  test('should work', (done) => {
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world');
      done();
    });
    serverSocket.emit('hello', 'world');
  });

  test('cookies are sent at handshake', async () => {
    expect(serverSocket.handshake.headers.cookie).not.toBeUndefined();
  });

  test('after authentication user object should be atached to request object', async () => {
    expect(serverSocket).toHaveProperty('user');
    expect(serverSocket.user).toHaveProperty('id');
    expect(typeof serverSocket.user.id).toBe('number');
  });
});
