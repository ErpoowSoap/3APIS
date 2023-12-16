import router from "./usersRouter.js";
import supertest from "supertest";
import app from "../app.js";
import { describe, it, expect } from "vitest";

describe ("User Router", () => {
    it("List of users", async () => {
        const res = await request(app).get("/users").set("Authorization", "ProjetRailRoad");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('register user', async () => {
        const res = await request(app)
          .post('/users/register')
          .send({
            name: 'Test10',
            email: 'test10@gmail.com',
            username: 'Test10',
            password: 'Test12310',
          });
        expect(res.statusCode).toEqual(201);
      });
})