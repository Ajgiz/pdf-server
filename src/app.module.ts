import { UserRoles } from "src/users/model/user-rolles";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/model/users";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { Roles } from "./roles/model/roles";
import { AuthModule } from "./auth/auth.module";
import { PdfModule } from './pdf/pdf.module';
import { DocumentModule } from './document/document.module';
@Module({
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    UsersModule,
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.pg_host,
      port: +process.env.pg_port,
      username: process.env.pg_user,
      password: process.env.pg_password,
      models: [User, Roles, UserRoles],
      database: process.env.pg_db,
    }),
    RolesModule,
    AuthModule,
    PdfModule,
    DocumentModule,
  ],
})
export class AppModule {}
