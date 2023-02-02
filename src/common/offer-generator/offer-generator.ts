import dayjs from 'dayjs';
import { Accommodation } from '../../types/accommodation.enum.js';
import { MockData } from '../../types/mock-data.types.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RAITING = 1;
const MAX_RAITING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_RENTAL_PRICE = 100;
const MAX_RENTAL_PRICE = 100000;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 20;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.preview);
    const photo = getRandomItems<string>(this.mockData.photos);
    const isPremium = Math.random() < 0.5;
    const rating = generateRandomValue(MIN_RAITING, MAX_RAITING);
    const typeAccommodation = getRandomItem([
      Accommodation.Apartment,
      Accommodation.Hotel,
      Accommodation.House,
      Accommodation.Room,
    ]);
    const numberRooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const numberGuests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const rentalPrice = generateRandomValue(MIN_RENTAL_PRICE, MAX_RENTAL_PRICE);
    const facilities = getRandomItems<string>(this.mockData.facilities);
    const name = getRandomItem<string>(this.mockData.users);
    const mail = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const isPro = Math.random() < 0.5;
    const numberComments = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    const coordinates = getRandomItem<string>(this.mockData.coordinates);

    return [
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
    ].join('\t');
  }
}
