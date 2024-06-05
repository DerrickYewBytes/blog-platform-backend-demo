import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(`JWT_ACCESS_SECRET_KEY`), // Use a real secret key
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findByEmail(payload.email);
    
        if (!user) {
          throw new UnauthorizedException();
        }
    
        return user;
      }

}