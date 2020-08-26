import mongoose from "mongoose";

export interface Movie extends mongoose.Document {
  _id: string;
  name: string;
  releaseDate: Date;
  duration: number;
  ratingsQuantity: number;
  ratingsAverage: number;
  coverImage: string;
  author: string;
  actors: [string];
}

const MovieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A movie must have a name"],
      unique: true,
    },
    releaseDate: {
      type: Date,
      required: [true, "A movie must have a release date"],
    },
    duration: {
      type: Number,
      required: true,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 0.0,
      min: [0, "Rating must be above 1.0"],
      max: [5, "Rating must be under 5.0"],
    },
    coverImage: {
      type: String,
      required: [true, "A movie must have a cover image"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    actors: {
      type: [String],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const MovieModel = mongoose.model<Movie>("Movie", MovieSchema, "Movies");
