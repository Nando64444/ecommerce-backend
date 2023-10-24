import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from 'src/users/dto/login-auth.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('register') //http://localhost/auth/register
    register(@Body() user: RegisterAuthDto){
        return this.authService.register(user);

    }

    @Post('login') //http://localhost/auth/login
    login(@Body() loginData: LoginAuthDto){
        console.log('Client Data: ', loginData)
        return this.authService.login(loginData);

    }

}
