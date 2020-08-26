import { currentUser, register, login } from "./auth";
import { movies, movie, createMovie, deleteMovie, editMovie } from "./movie";
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
  },
};

export default resolverMap;
