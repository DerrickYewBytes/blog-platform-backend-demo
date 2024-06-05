import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserEntity from 'src/db/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) { }

    async login(user: UserEntity) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(payload: any): Promise<UserEntity> {
        return this.userService.findByEmail(payload.email);
    }
}

