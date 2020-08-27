import { currentUser, register, login } from "./auth";
import {
  movies,
  movie,
  createMovie,
  deleteMovie,
  editMovie,
  moviesByUser,
} from "./movie";
import { addReview } from "./review";
const resolverMap = {
  Query: {
    currentUser,
    movies,
    movie,
    moviesByUser,
  },
  Mutation: {
    login,
    register,
    createMovie,
    deleteMovie,
    editMovie,
    addReview,
  },
};

export default resolverMap;
