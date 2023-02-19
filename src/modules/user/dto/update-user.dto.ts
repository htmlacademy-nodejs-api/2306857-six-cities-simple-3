import {
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export default class UpdateUserDto {
  @MaxLength(256, {message: 'Too short for field «avatar»'})
  public avatar?: string;

  @IsString({ message: 'name must be a string' })
  @MinLength(1, { message: 'Minimum name length must be 1' })
  @MaxLength(15, { message: 'Maximum name length must be 15' })
  public name?: string;
}
