import { Accommodation } from '../../../types/accommodation.enum.js';
import { City } from '../../../types/city.enum.js';
import { Facilities } from '../../../types/facilities.enum.js';
import {IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, IsBoolean, ArrayMinSize, ArrayMaxSize, IsString} from 'class-validator';

export default class CreateOfferDto {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public publicationDate!: Date;

  @IsEnum(City, {message: 'type must be Paris/Cologne/Brussels/Amsterdam/Hamburg/Dusseldorf'})
  public city!: City;

  @MaxLength(256, {message: 'Too short for field «image»'})
  public preview!: string;

  @IsArray({ message: 'Field images must be an array' })
  @ArrayMinSize(6, { message: 'Images min count must be 6' })
  @ArrayMaxSize(6, { message: 'Images count must be 6' })
  @IsString({ each: true, message: 'Images field must be an array of string' })
  public photo!: string[];

  @IsBoolean({ message: 'Field isPremium must be a boolean' })
  public isPremium!: boolean;

  // public rating!: number;

  @IsEnum(Accommodation, {message: 'type must be apartment/house/room/hotel'})
  public typeAccommodation!: Accommodation;

  @IsInt({ message: 'numberRooms must be an integer' })
  @Min(1, { message: 'Minimum numberRooms is 1' })
  @Max(8, { message: 'Maximum numberRooms is 8' })
  public numberRooms!: number;

  @IsInt({ message: 'numberRooms must be an integer' })
  @Min(1, { message: 'Minimum numberGuests is 1' })
  @Max(10, { message: 'Maximum numberGuests is 10' })
  public numberGuests!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100000'})
  public rentalPrice!: number;

  @IsArray({ message: 'Field facilities must be an array' })
  @IsEnum(Facilities, {message: 'type must be Breakfast/Air conditioning/Laptop friendly workspace/Baby seat/Washer/Towels/Fridge'})
  public facilities!: Facilities[];

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;

  @IsArray({ message: 'Field coordinates must be an array' })
  @IsString({ each: true, message: 'coordinates field must be an array of string' })
  public coordinates!: string[];
}
