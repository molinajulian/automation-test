import { Offer } from '../models/offer.model';

export interface GetOffersResponse {
  offers: Offer[];
  pagination: {
    sortBy: string;
    sortType: string;
    total: number;
  };
}
