import { Accommodation } from './accommodation.enum';
import { City } from './city.enum';
import { Facilities } from './facilities.enum';
import { User } from './user.type';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  preview: string;
  photo: string[];
  isPremium: boolean;
  rating: number;
  typeAccommodation: Accommodation;
  numberRooms: number;
  numberGuests: number;
  rentalPrice: number;
  facilities: Facilities[];
  user: User;
  numberComments: number;
  coordinates: string[];
};
