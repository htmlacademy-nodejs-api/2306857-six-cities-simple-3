import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean
} from 'class-validator';
import { NameLength, PasswordLength } from '../user.constant.js';

export default class CreateUserDto {
  @IsEmail({}, { message: 'mail must be valid address' })
  public mail!: string;

  @IsString({ message: 'name must be a string' })
  @MinLength(NameLength.min, { message: `Minimum name length must be ${NameLength.min}` })
  @MaxLength(NameLength.max, { message: `Maximum name length must be ${NameLength.max}` })
  public name!: string;

  @IsBoolean({ message: 'Field isPro must be a boolean' })
  public isPro!: boolean;

  @IsString({ message: 'password is required' })
  @MinLength(PasswordLength.min, { message: `Minimum password length must be ${PasswordLength.min}` })
  @MaxLength(PasswordLength.max, { message: `Maximum password length must be ${PasswordLength.max}` })
  public password!: string;
}
