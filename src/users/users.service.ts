import { IBan } from "./dto/user-ban";
import { Roles } from "src/roles/model/roles";
import { CreateUser } from "./dto/create-user";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model/users";
import { RolesService } from "src/roles/roles.service";
import { IAddRole } from "./dto/users-role";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private UserModel: typeof User,
    private RolesService: RolesService
  ) {}

  async createUser(CreateDataUser: CreateUser) {
    const newUser = await this.UserModel.create(CreateDataUser);
    const role = await this.RolesService.getRoleByValue("USER");
    newUser.$set("roles", [role.id]);
    newUser.roles = [role];
    return newUser;
  }

  async getUserByEmail(value: string) {
    const user = await this.UserModel.findOne({
      where: { email: value },
      include: { all: true },
    });
    return user;
  }

  async getUser() {
    const users = await this.UserModel.findAll({ include: { all: true } });
    return users;
  }

  async addRole(data: IAddRole) {
    const user = await this.UserModel.findByPk(data.userId);
    const role = await this.RolesService.getRoleByValue(data.value);

    if (user && role) {
      user.$add("role", role.id);
      return data;
    } else {
      throw new HttpException("user or role not found", HttpStatus.NOT_FOUND);
    }
  }

  async ban(data: IBan) {
    const user = await this.UserModel.findByPk(data.userId);
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = data.banReason;
    user.save();
  }
}
