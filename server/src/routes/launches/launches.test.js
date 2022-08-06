const request = require("supertest");
//supertest requires an app to test
const app = require("../../app");
//db connect service
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /v1/launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /v1/launches", () => {
    const completeLaunchData = {
      mission: "Kepler Exploration X",
      rocket: "Explorer IS1",
      launchDate: "December 27, 2030",
      target: "Kepler-1652 b",
    };

    const lauchDataNoDate = {
      mission: "Kepler Exploration X",
      rocket: "Explorer IS1",
      target: "Kepler-1652 b",
    };

    const lauchDataBadDate = {
      mission: "Kepler Exploration X",
      rocket: "Explorer IS1",
      launchDate: "hello",
      target: "Kepler-1652 b",
    };

    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(lauchDataNoDate);
    });

    test("It should catch missing requred properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(lauchDataNoDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing 1 or more required launch properties",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(lauchDataBadDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
