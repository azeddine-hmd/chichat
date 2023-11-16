import request from 'supertest';
import { app } from '../src/app';
import { RegisterDto } from '../src/auth/dto/register-dto';

describe('test register', () => {

  test('valid user register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'test',
        displayName: 'test',
        email: 'test@test.com',
        password: '123456789_Q',
        dateOfBirth: {
          day: 14,
          month: 5,
          year: 1999,
        },
      } as RegisterDto)
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(201);
  });

});
