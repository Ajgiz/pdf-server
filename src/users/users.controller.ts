import { IBan } from "./dto/user-ban";
import { AddRole } from "./../../dist/src/users/types/add-role.d";
import { roles_key, Roles } from "../auth/decorator/check-role.decorator";
import { JwtAuthGuard } from "./../auth/jwt-auth.guard";
import { CreateUser } from "./dto/create-user";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("/users")
export class UsersController {
  constructor(private UserService: UsersService) {}
  @Post()
  create(@Body() userData: CreateUser) {
    return this.UserService.createUser(userData);
  }
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.UserService.getUser();
  }
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post(":/role")
  addRole(@Body() userData: AddRole) {
    return this.UserService.addRole(userData);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post("/ban")
  ban(@Body() data: IBan) {
    return this.UserService.ban(data);
  }
}
