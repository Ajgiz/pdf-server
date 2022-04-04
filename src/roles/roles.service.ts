import { CreateRoleData } from "../roles/types/roles";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Roles } from "./model/roles";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private RolesModel: typeof Roles) {}
  async createRole(CreateDataRole: CreateRoleData) {
    const newRole = await this.RolesModel.create(CreateDataRole);
    return newRole;
  }

  async getRoleByValue(value: string) {
    const findRole = await this.RolesModel.findOne({ where: { value } });
    return findRole;
  }
}
