import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean
} from 'class-validator';

export default class CreateUserDto {
  @IsEmail({}, { message: 'mail must be valid address' })
  public mail!: string;

  @IsString({ message: 'name must be a string' })
  @MinLength(1, { message: 'Minimum name length must be 1' })
  @MaxLength(15, { message: 'Maximum name length must be 15' })
  public name!: string;

  @IsBoolean({ message: 'Field isPro must be a boolean' })
  public isPro!: boolean;

  @IsString({ message: 'password is required' })
  @MinLength(6, { message: 'Minimum password length must be 6' })
  @MaxLength(12, { message: 'Maximum password length must be 12' })
  public password!: string;
}
