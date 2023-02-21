import { User } from '../../types/user.type';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import {createSHA256} from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.mail = data.mail;
    this.avatar = data.avatar;
    this.name = data.name;
    this.isPro = data.isPro;
  }

  @prop({ unique: true, required: true })
  public mail!: string;

  @prop({required: false, default: ''})
  public avatar!: string;

  @prop({required: true, default: ''})
  public name!: string;

  @prop({required: true, default: false})
  public isPro!: boolean;

  @prop({required: true, default: ''})
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
