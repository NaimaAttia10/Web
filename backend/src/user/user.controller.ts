import { Body, Controller, Post , Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { UserSignInDTO } from './dto/user-signin';
import { AuthGuard } from './auth.guard';

@Controller('user')
export class UserController {
    constructor (private userService : UserService){}

    @Post('/signup') 
    async signupuser(@Body() user : UserSignUpDTO){
        return await this.userService.signup(user)
    }
    @Post('/login')
    async loginuser(@Body() user : UserSignInDTO){
        return await this.userService.login(user);
    }
    
    @UseGuards(AuthGuard)
    @Get()
    async test(@Request() req){
        return req.user;
    }
}
