export interface RegisterResponse extends UserInfo {}

export interface LoginResponse {
  token: string;
}

export interface UserInfo {
  id: string;
  username: string;
}

export interface Context {
  userInfo: UserInfo;
}

export interface MovieResponse {
  _id: string;
  name: string;
  releaseDate: Date;
  duration: number;
  actors: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
}

export interface ReviewResponse {
  _id: string;
  rating: number;
  review: string;
  user: string;
  movie: string;
}
