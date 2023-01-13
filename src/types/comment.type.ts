import { User } from './user.type';

export type Comment = {
  text: string;
  publicationDate: Date;
  raiting: number;
  user: User;
};
