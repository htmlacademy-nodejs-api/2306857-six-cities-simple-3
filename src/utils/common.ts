import { Accommodation } from '../types/accommodation.enum';
import { City } from '../types/city.enum';
import { Facilities } from '../types/facilities.enum';
import { Offer } from '../types/offer.type';
import { User } from '../types/user.type';
import crypto from 'crypto';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    publicationDate,
    city,
    preview,
    photo,
    isPremium,
    rating,
    typeAccommodation,
    numberRooms,
    numberGuests,
    rentalPrice,
    facilities,
    name,
    mail,
    avatar,
    password,
    isPro,
    numberComments,
    coordinates,
  ] = tokens;
  return {
    title,
    description,
    publicationDate: new Date(publicationDate),
    city: city as City,
    preview,
    photo: photo.split(';'),
    isPremium: Boolean(isPremium),
    rating: Number(rating),
    typeAccommodation: typeAccommodation as Accommodation,
    numberRooms: Number(numberRooms),
    numberGuests: Number(numberGuests),
    rentalPrice: Number(rentalPrice),
    facilities: facilities.split(';') as Facilities[],
    user: {
      name,
      mail,
      avatar,
      password,
      isPro: Boolean(isPro),
    } as User,
    numberComments: Number(numberComments),
    coordinates: coordinates.split(', '),
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});
