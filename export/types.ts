export interface AppRating {
  star0: number;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
  total: number;
}

export interface Review {
  appId: string;
  dateCreated: number;
  description: string;
  distro: string;
  karmaDown: number;
  karmaUp: number;
  locale: string;
  rating: number;
  reported: number;
  reviewId: number;
  summary: string;
  userDisplay: string;
  userHash: string;
  version: string;
}

export interface App extends AppRating {
  appId: string;
  reviews: Review[];
}
