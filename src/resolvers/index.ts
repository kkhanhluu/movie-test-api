import { currentUser, register, login } from "./auth";
import { movies, movie, createMovie, deleteMovie, editMovie } from "./movie";
import { addReview } from "./review";
const resolverMap = {
  Query: {
    currentUser,
    movies,
    movie,
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
