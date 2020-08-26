import { Context, ReviewResponse } from "src/types";
import { checkUserIsAuthenticated } from "./auth";
import { ReviewModel } from "../models/review";

export async function addReview(
  _: void,
  args: any,
  ctx: Context | null,
): Promise<ReviewResponse> {
  checkUserIsAuthenticated(ctx);

  const { rating, review, movie } = args;

  const reviewDoc = new ReviewModel({
    rating,
    review,
    movie,
    user: (ctx as Context).userInfo.id,
  });

  await reviewDoc.save();

  return reviewDoc;
}
