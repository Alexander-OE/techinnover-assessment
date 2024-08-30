import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto, SignupDto } from './dto/Auth.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('admin/signup')
  async adminSignup(@Body() signupDto: SignupDto) {
    return this.authenticationService.adminSignup(
      signupDto.name,
      signupDto.email,
      signupDto.role,
      signupDto.password,
    );
  }

  @Post('signup')
  async signUp(@Body() signupDto: SignupDto) {
    return this.authenticationService.signup(
      signupDto.name,
      signupDto.email,
      signupDto.role,
      signupDto.password,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto.email, loginDto.password);
  }
}
