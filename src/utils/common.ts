import { Accommodation } from '../types/accommodation.enum';
import { City } from '../types/city.enum';
import { Facilities } from '../types/facilities.enum';
import { Offer } from '../types/offer.type';
import { User } from '../types/user.type';
import crypto from 'crypto';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
import * as jose from 'jose';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ServiceError } from '../types/service-error.enum.js';
import { DEFAULT_STATIC_IMAGES } from '../app/application.constant.js';
import { UnknownObject } from '../types/unknown-object.type.js';

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

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property)
      {transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};

export const transformObject = (
  properties: string[],
  staticPath: string,
  uploadPath: string,
  data: UnknownObject
) => {
  properties
    .forEach((property) =>
      transformProperty(
        property, data,
        (target: UnknownObject) => {
          const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
          target[property] = `${rootPath}/${target[property]}`;
        }));
};
