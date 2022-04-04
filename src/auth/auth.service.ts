import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateUser } from "src/users/dto/create-user";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private UserService: UsersService,
    private JwtService: JwtService
  ) {}
  async login(userData: CreateUser) {
    const validData = await this.validateUser(userData);
    return this.generateToken(validData);
  }

  async registration(userData: CreateUser) {
    const candidate = await this.UserService.getUserByEmail(userData.email);
    if (candidate) {
      throw new HttpException(
        "User with email already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userData.password, 5);
    const newUser = await this.UserService.createUser({
      ...userData,
      password: hashPassword,
    });
    return this.generateToken(newUser);
  }

  private async validateUser(userData: CreateUser) {
    const user = await this.UserService.getUserByEmail(userData.email);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    }
    const isCorrectPassword = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!isCorrectPassword) {
      throw new HttpException("password is wrong", HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  private async generateToken(userData: CreateUser) {
    const payload = { email: userData.email };

    return {
      token: this.JwtService.sign(payload),
    };
  }
}
