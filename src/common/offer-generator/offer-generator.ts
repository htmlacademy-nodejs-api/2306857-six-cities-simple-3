import dayjs from 'dayjs';
import { RatingRange } from '../../modules/comment/comment.constant.js';
import { Accommodation } from '../../types/accommodation.enum.js';
import { MockData } from '../../types/mock-data.types.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../utils/random.js';
import { CommentsCount, GuestsRange, RentalPriceRange, RoomsRange, WeekDay } from './offer-generator.constant.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = dayjs()
      .subtract(generateRandomValue(WeekDay.first, WeekDay.last), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.preview);
    const photo = getRandomItems<string>(this.mockData.photos);
    const isPremium = Math.random() < 0.5;
    const rating = generateRandomValue(RatingRange.min, RatingRange.max);
    const typeAccommodation = getRandomItem([
      Accommodation.Apartment,
      Accommodation.Hotel,
      Accommodation.House,
      Accommodation.Room,
    ]);
    const numberRooms = generateRandomValue(RoomsRange.min, RoomsRange.max);
    const numberGuests = generateRandomValue(GuestsRange.min, GuestsRange.max);
    const rentalPrice = generateRandomValue(RentalPriceRange.min, RentalPriceRange.max);
    const facilities = getRandomItems<string>(this.mockData.facilities);
    const name = getRandomItem<string>(this.mockData.users);
    const mail = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const isPro = Math.random() < 0.5;
    const numberComments = generateRandomValue(CommentsCount.min, CommentsCount.max);
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
