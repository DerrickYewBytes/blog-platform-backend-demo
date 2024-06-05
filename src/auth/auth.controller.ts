import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) { }

    @Post('login')
    async login(@Body('username') email: string, @Body('password') password: string) {
        const user = await this.userService.validateUser(email, password);
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return this.authService.validateUser(req.user);
    }

    @Post('logout')
    logout() {
        localStorage.removeItem('access_token');
        return { message: 'Please delete your JWT' };
    }

}
