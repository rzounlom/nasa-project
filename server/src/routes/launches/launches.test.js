const request = require("supertest");
//supertest requires an app to test
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: "December 27, 2030",
    target: "Kepler-422 b",
  };

  const lauchDataNoDate = {
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    target: "Kepler-422 b",
  };

  const lauchDataBadDate = {
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: "hello",
    target: "Kepler-422 b",
  };

  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
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
      .post("/launches")
      .send(lauchDataNoDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing 1 or more required launch properties",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(lauchDataBadDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
