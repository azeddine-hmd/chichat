import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/config';
import { RegisterDto } from '../src/api/auth/types/dto/register-dto';

describe('test register', () => {

  afterAll(() => {
    prisma.$disconnect();
  });

  test('valid user register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'test',
        displayName: 'test',
        email: 'test@test.com',
        password: '123456789_Qw',
        dateOfBirth: {
          day: 14,
          month: 5,
          year: 1999,
        },
      } as RegisterDto)
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(204);
  });

});
