import {Expose} from 'class-transformer';

export default class UserResponse {
  @Expose()
  public id!: string;

  @Expose()
  public mail!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public name!: string;

  @Expose()
  public isPro!: string;
}
