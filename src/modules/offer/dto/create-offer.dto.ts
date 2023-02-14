import { Accommodation } from '../../../types/accommodation.enum';
import { City } from '../../../types/city.enum';
import { Facilities } from '../../../types/facilities.enum';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public publicationDate!: Date;
  public city!: City;
  public preview!: string;
  public photo!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public typeAccommodation!: Accommodation;
  public numberRooms!: number;
  public numberGuests!: number;
  public rentalPrice!: number;
  public facilities!: Facilities[];
  public user!: string;
  public coordinates!: string[];
}
