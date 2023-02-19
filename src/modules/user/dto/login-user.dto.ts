import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export default class LoginUserDto {
  @IsEmail({}, { message: 'mail must be valid address' })
  public mail!: string;

  @IsString({ message: 'password is required' })
  @MinLength(6, { message: 'Minimum password length must be 6' })
  @MaxLength(12, { message: 'Maximum password length must be 12' })
  public password!: string;
}
