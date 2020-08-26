import { MovieModel } from "../models/movie";
import { MovieResponse } from "src/types";

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
