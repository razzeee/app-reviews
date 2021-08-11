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
  app_id: string;
  date_created: number;
  description: string;
  distro: string;
  karma_down: number;
  karma_up: number;
  locale: string;
  rating: number;
  reported: number;
  review_id: number;
  summary: string;
  user_display: string;
  user_hash: string;
  version: string;
}
