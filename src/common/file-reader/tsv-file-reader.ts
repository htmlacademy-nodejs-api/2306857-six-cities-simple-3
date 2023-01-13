import { readFileSync } from 'fs';
import { Accommodation } from '../../types/accommodation.enum.js';
import { City } from '../../types/city.enum.js';
import { Facilities } from '../../types/facilities.enum.js';
import { Offer } from '../../types/offer.type.js';
import { User } from '../../types/user.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(
        ([
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
        ]) => ({
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
        })
      );
  }
}
