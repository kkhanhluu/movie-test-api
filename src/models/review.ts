import mongoose from "mongoose";

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

export const ReviewModel = mongoose.model<Review>(
  "Review",
  ReviewSchema,
  "Reviews",
);
