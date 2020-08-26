import * as setup from "../../__tests__/setup";
import { MovieModel, Movie } from "../../models";
import { addReview } from "../review";

let testMongo: setup.TestMongoConn;
let testMovie: Movie;

beforeEach(async () => {
  testMongo = await setup.beforeEach();

  testMovie = new MovieModel({
    name: "Test Movie",
    duration: 90,
    releaseDate: "1598438370837",
    actors: [],
    coverImage:
      "https://image.tmdb.org/t/p/w500/e7ZsW5EbLbQwoGx0548KCmCAXA9.jpg",
    author: "5f4594c7fd480639e8d889e9",
  });

  await testMovie.save();
});

afterEach(() => setup.afterEach(testMongo));

describe("Test create review", () => {
  it("should create a review", async () => {
    const reviewDoc = await addReview(
      undefined,
      {
        rating: 3,
        review: "Very good",
        user: "5f4594c7fd480639e8d889e9",
        movie: testMovie.id,
      },
      {
        userInfo: {
          id: "5f4594c7fd480639e8d889e9",
          username: "Test User",
        },
      },
    );

    expect(reviewDoc).toBeDefined();
    expect(reviewDoc.review).toEqual("Very good");
    expect(reviewDoc.rating).toEqual(3);
  });

  it("should not create a review", async () => {
    let error;
    try {
      await addReview(
        undefined,
        {
          rating: 3,
          review: "Very good",
          user: "5f4594c7fd480639e8d889e9",
          movie: testMovie.id,
        },
        null,
      );
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new Error("Not authenticated"));
  });
});
