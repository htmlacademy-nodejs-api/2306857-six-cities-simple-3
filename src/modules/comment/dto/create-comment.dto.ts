import {
  IsMongoId,
  IsString,
  Length,
  IsInt,
  Min,
  Max
} from 'class-validator';
import { CommentLength, RatingRange } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(CommentLength.min, CommentLength.max, { message: `text min length is ${CommentLength.min}, max is ${CommentLength.max}` })
  public text!: string;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId!: string;

  public userId!: string;

  @IsInt({ message: 'rating must be an integer' })
  @Min(RatingRange.min, { message: `Minimum rating is ${RatingRange.min}` })
  @Max(RatingRange.max, { message: `Maximum rating is ${RatingRange.max}` })
  public rating!: number;
}
