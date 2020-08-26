import * as setup from "../../__tests__/setup";
import { MovieModel } from "../../models";
import { movies, movie } from "../movie";
let testMongo: setup.TestMongoConn;

beforeEach(async () => {
  testMongo = await setup.beforeEach();
});

afterEach(() => setup.afterEach(testMongo));

describe("Test get movies", () => {
  it("should return all movies in database", async () => {
    const testMovie1 = new MovieModel({
      name: "Test Movie 1",
      duration: 90,
      releaseDate: "1598438370837",
      actors: [],
      coverImage:
        "https://image.tmdb.org/t/p/w500/e7ZsW5EbLbQwoGx0548KCmCAXA9.jpg",
      author: "5f4594c7fd480639e8d889e9",
    });

    const testMovie2 = new MovieModel({
      name: "Test Movie 2",
      duration: 90,
      releaseDate: "1598438370837",
      actors: [],
      coverImage:
        "https://image.tmdb.org/t/p/w500/e7ZsW5EbLbQwoGx0548KCmCAXA9.jpg",
      author: "5f4594c7fd480639e8d889e9",
    });

    await testMovie1.save();
    await testMovie2.save();

    const response = await movies(undefined);
    expect(response.length).toEqual(2);
    expect(response[0].name).toEqual("Test Movie 1");
    expect(response[1].name).toEqual("Test Movie 2");
  });
});

describe("Test get one movie", () => {
  it("should return one movie and movie should populate reviews", async () => {
    const testMovie = new MovieModel({
      name: "Test Movie ",
      duration: 90,
      releaseDate: "1598438370837",
      actors: [],
      coverImage:
        "https://image.tmdb.org/t/p/w500/e7ZsW5EbLbQwoGx0548KCmCAXA9.jpg",
      author: "5f4594c7fd480639e8d889e9",
    });

    await testMovie.save();

    const response = movie(undefined, { id: testMovie.id });
    expect(response).toBeDefined();
    expect(response.name).toEqual("Test Movie");
    expect(response.duration).toEqual(90);
    expect(response.reviews).toBeDefined();
  });

  it("should throw error if the movie does not exist", async () => {
    let error, response;
    try {
      response = movie(undefined, { id: "5f462df07ecef6b11c50fe5b" });
    } catch (e) {
      error = e;
    }
    expect(response).toBeUndefined();
    expect(error).toEqual(new Error("Cannot find the movie"));
  });
});
