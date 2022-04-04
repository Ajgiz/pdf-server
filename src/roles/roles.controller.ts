import { CreateRoleData } from "./types/roles";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";

@Controller("roles")
export class RolesController {
  constructor(private RolesService: RolesService) {}
  @Post("/")
  create(@Body() data: CreateRoleData) {
    return this.RolesService.createRole(data);
  }
  @Get("/:value")
  getRoleByValue(@Param("value") value: string) {
    return this.RolesService.getRoleByValue(value);
  }
}
