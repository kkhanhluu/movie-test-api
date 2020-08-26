import * as setup from "../../__tests__/setup";
import { MovieModel } from "../../models";
import { movies } from "../movie";
let testMongo: setup.TestMongoConn;

beforeEach(async () => {
  testMongo = await setup.beforeEach();
});

afterEach(() => setup.afterEach(testMongo));

describe("Test get movies", () => {
  it("should return all movies in database", async () => {
    const testMovie1 = new MovieModel({
      name: "Test Movie 1",
      durationSeconds: 90,
      releaseDate: "1598438370837",
      actors: [],
      coverImage:
        "https://image.tmdb.org/t/p/w500/e7ZsW5EbLbQwoGx0548KCmCAXA9.jpg",
      author: "5f4594c7fd480639e8d889e9",
    });

    const testMovie2 = new MovieModel({
      name: "Test Movie 2",
      durationSeconds: 90,
      releaseDate: "1598438370837",
      actors: [],
      coverImage:
        "https://image.tmdb.org/t/p/w500/e7ZsW5EbLbQwoGx0548KCmCAXA9.jpg",
      author: "5f4594c7fd480639e8d889e9",
    });

    await testMovie1.save();

    const response = await movies(undefined);
    expect(response.length).toEqual(2);
    expect(response[0].name).toEqual("Test Movie 1");
    expect(response[1].name).toEqual("Test Movie 2");
  });
});
