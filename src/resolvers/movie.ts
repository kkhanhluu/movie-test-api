import { MovieModel, Movie } from "../models/movie";
import { MovieResponse, Context } from "src/types";
import { checkUserIsAuthenticated } from "./auth";

export async function movies(_: void): Promise<MovieResponse[]> {
  return await MovieModel.find();
}

export async function movie(_: void, args: any): Promise<MovieResponse> {
  const movie = await MovieModel.findById(args.id).populate("reviews");

  if (movie === null) {
    throw new Error("Cannot find the movie");
  }
  return movie;
}

export async function createMovie(
  _: void,
  args: any,
  ctx: Context | null,
): Promise<Movie> {
  checkUserIsAuthenticated(ctx);

  const { name, releaseDate, duration, actors, coverImage } = args;
  const movie: Movie = new MovieModel({
    name,
    releaseDate,
    duration,
    actors,
    author: (ctx as Context).userInfo.id,
    coverImage,
  });

  await movie.save();

  return movie;
}
