export interface Movie {
  AddMovie: MovieData[];
}

export interface MovieData {
  id?: number;
  title: string;
  castMember: string;
  date: string;
  reviews: string;
  likeCount?: number;
  Comment?: string;
  Rating?: number;
}
