import request from 'supertest';
import app from '../app';
import { describe, it, expect } from 'vitest';
const req = request.agent(app);

  describe('GET /users', () => {
    it('list of user', async () => {
      const res = await req
        .get('/users')
        .set('Authorization', 'ProjetRailRoad');
      expect(res.statusCode).toEqual(401);
      expect(Array.isArray(res.body)).toBe(false);
    });
  });

  describe('POST /users/register', () => {
    it('register a new user', async () => {
      const res = await req.post('/users/register').send({
        name: 'Test10',
        email: 'test10@gmail.com',
        username: 'Test10',
        password: 'Test12310',
      });
      expect(res.statusCode).toEqual(201);
    });
  }, 15000);

  describe('POST /users/login', () => {
    it('login account', async () => {
      const login = {
        username: 'Test10',
        password: 'Test12310',
      };

      const connect = await req.post('/users/login').send(login);
      console.log (connect.text);
      expect(connect.status).toBe(200);
      expect(connect.body.token).toBeDefined();
      expect(connect.body.message).toBe('Logged');
    });
  }, 20000);

  describe('PUT /users/:id', () => {
    it('update a user', async () => {
      const userId = '657f544c352f699c2747e25d';
      const updatedUser = {
        name: 'Test33',
        username: 'Test33',
      };

      const response = await req
        .put(`/users/${userId}`)
        .send(updatedUser);
      expect(response.status).toEqual(403);
      expect(response.body).toBeDefined();
    });
  });

  describe('DELETE /users/:id', () => {
    it('delete user', async () => {
      const userId = '657f544c352f699c2747e25d';

      const response = await req.delete(`/users/${userId}`);
      expect(response.status).toEqual(401);
      expect(response.body).toHaveProperty('error');
    });
  });