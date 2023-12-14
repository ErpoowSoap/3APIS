import app from "./app.js";
import supertest from "supertest";
import { describe, it, expect } from "vitest";

describe("GET /ping", () => {
  it("[200] should return pong", async () => {
    const request = supertest(app);

    const response = await request.get("/ping").send();

    expect(response.status).toEqual(200);
    expect(response.text).toEqual("pong");
  });
});

describe("POST /pong", () => {
  const request = supertest(app);
  it.each`
    n    | expected
    ${1} | ${"ping"}
    ${2} | ${"pong"}
  `("[200] should return $expected when it's $n", async ({ n, expected }) => {
    const response = await request.post("/pong").send({
      n,
    });

    expect(response.status).toEqual(200);
    expect(response.text).toEqual(expected);
  });
});
