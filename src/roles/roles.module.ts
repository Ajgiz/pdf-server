import { UserRoles } from "src/users/model/user-rolles";
import { User } from "../users/model/users";
import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { Roles } from "./model/roles";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Roles, User, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
