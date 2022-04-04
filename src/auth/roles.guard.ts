import { roles_key } from "./decorator/check-role.decorator";
import { JwtService } from "@nestjs/jwt";
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private JwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride(roles_key, [
        context.getHandler,
        context.getClass,
      ]);

      if (!requiredRoles) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (bearer != "Bearer" || !token) {
        throw new UnauthorizedException({ message: "token is invalid" });
      }

      const user = this.JwtService.verify(token);
      req.user = user;
      return user.roles.some((role) => role.includes(role.value));
    } catch (e) {
      throw new HttpException("Not right", HttpStatus.FORBIDDEN);
    }
  }
}
