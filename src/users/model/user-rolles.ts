import { Roles } from "./../../roles/model/roles";
import { DataType } from "sequelize-typescript";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./users";
@Table({ tableName: "user-rolles", timestamps: false })
export class UserRoles extends Model<UserRoles> {
  @Column({ type: DataType.INTEGER, primaryKey: true, unique: true })
  id: number;
  @ForeignKey(() => Roles)
  @Column({ type: DataType.INTEGER })
  roleId: number;
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
