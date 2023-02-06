import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { Accommodation } from '../../types/accommodation.enum.js';
import { City } from '../../types/city.enum.js';
import { Facilities } from '../../types/facilities.enum.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true, required: true})
  public description!: string;

  @prop({required: true})
  public publicationDate!: Date;

  @prop({required: true})
  public city!: City;

  @prop({required: true})
  public preview!: string;

  @prop({type: () => String,required: true})
  public photo!: string[];

  @prop()
  public isPremium!: boolean;

  @prop({required: true})
  public rating!: number;

  @prop({
    type: () => String,
    enum: Accommodation,
    required: true
  })
  public typeAccommodation!: Accommodation;

  @prop({required: true})
  public numberRooms!: number;

  @prop({required: true})
  public numberGuests!: number;

  @prop({required: true})
  public rentalPrice!: number;

  @prop({
    type: () => String,
    enum: Facilities,
    required: true
  })
  public facilities!: Facilities[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public user!: Ref<UserEntity>;

  @prop({type: () => String, required: true})
  public coordinates!: string[];
}

export const OfferModel = getModelForClass(OfferEntity);
