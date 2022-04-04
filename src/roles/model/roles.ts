import { RolesAttr } from "./../types/roles";
import {
  BelongsToMany,
  Column,
  Model,
  Table,
  DataType,
} from "sequelize-typescript";
import { User } from "../../users/model/users";
import { UserRoles } from "src/users/model/user-rolles";

@Table({ tableName: "roles" })
export class Roles extends Model<Roles, RolesAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, unique: true })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  description: string;
  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
