import { IsEmail, IsEmpty, IsString } from "class-validator";
import { Length, Max, Min } from "sequelize-typescript";

export class CreateUser {
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "invalid email" })
  @IsEmpty({ message: "This field is required" })
  readonly email: string;
  @IsString({ message: "password must be string" })
  @IsEmpty({ message: "This field is required" })
  // @Min(6)
  // @Max(56)
  readonly password: string;
}
