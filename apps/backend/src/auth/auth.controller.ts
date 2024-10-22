import { Controller, Get, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { GetUser } from '../decorators/get-user.decorator';
import { GoogleOauthGuard } from '../guards/http-google-oauth.guard';
import { GoogleLoginUserDto } from './dto/google-login.dto';

@UseGuards(GoogleOauthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async googleAuth(@Req() _req: Request) {}

  @Get('google-redirect')
  googleAuthRedirect(@GetUser() user: GoogleLoginUserDto) {
    return this.authService.googleLogin(user);
  }
}
