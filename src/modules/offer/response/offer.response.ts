import {Expose, Type} from 'class-transformer';
import { Facilities } from '../../../types/facilities.enum';
import UserResponse from '../../user/response/user.response.js';

export default class OfferResponse {

@Expose()
  public id!: string;

  @Expose()
public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public publicationDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public preview!: string;

  @Expose()
  public photo!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public typeAccommodation!: string;

  @Expose()
  public numberRooms!: string;

  @Expose()
  public numberGuests!: string;

  @Expose()
  public rentalPrice!: string;

  @Expose()
  public facilities!: Facilities[];

  @Expose()
  public coordinates!: string[];

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;
}


