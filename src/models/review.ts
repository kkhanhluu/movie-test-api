import mongoose from "mongoose";
import { MovieModel } from "./movie";

export interface Review extends mongoose.Document {
  _id: string;
  rating: number;
  review: string;
  user: string;
  movie: string;
}

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "A Review must have a rating"],
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: [true, "A review must not be empty"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A Review must belong to an user"],
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: [true, "A Review must belong to a movie"],
  },
});

ReviewSchema.index({ user: 1, movie: 1 }, { unique: true });

ReviewSchema.pre(/^find/, function (next) {
  (this as any).populate({
    path: "user",
    select: "username",
  });
  next();
});

ReviewSchema.statics.updateRatingForMovie = async function (movieId: string) {
  const stats = await (this as any).aggregate([
    { $match: { movie: movieId } },
    {
      $group: {
        _id: "$movie",
        numberOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    const doc = await MovieModel.findByIdAndUpdate(movieId, {
      ratingsQuantity: stats[0].numberOfRating,
      ratingsAverage: stats[0].avgRating,
    });

    console.log(doc);
  } else {
    await MovieModel.findByIdAndUpdate(movieId, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }
};

ReviewSchema.post("save", function (doc: Review) {
  (doc.constructor as any).updateRatingForMovie(doc.movie);
});

export const ReviewModel = mongoose.model<Review>(
  "Review",
  ReviewSchema,
  "Reviews",
);
