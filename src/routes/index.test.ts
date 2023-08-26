import request from "supertest";
import app from "../app";

describe("GET /", () => {
  it("should return 200", () => {
    request(app)
      .get('/')
      .expect(200, 'Hello World!')
  })
});