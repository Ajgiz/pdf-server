import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Roles } from "src/roles/model/roles";
import { UserRoles } from "./user-rolles";
interface UserCreationsAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationsAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(6),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  banned: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  banReason: string;

  @BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[];
}
