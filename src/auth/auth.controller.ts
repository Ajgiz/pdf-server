import { CreateUser } from "../users/dto/create-user";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post("/login")
  login(@Body() userData: CreateUser) {
    return this.AuthService.login(userData);
  }

  @Post("/registration")
  registration(@Body() userData: CreateUser) {
    return this.AuthService.registration(userData);
  }
}
