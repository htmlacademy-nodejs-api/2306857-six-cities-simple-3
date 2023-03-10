import {Expose} from 'class-transformer';

export default class LoggedUserResponse {
  @Expose()
  public token!: string;

  @Expose()
  public mail!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public name!: string;
}
