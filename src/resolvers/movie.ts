import { MovieModel } from "../models/movie";
import { MovieResponse } from "src/types";

export async function movies(_: void): Promise<MovieResponse[]> {
  return await MovieModel.find();
}
