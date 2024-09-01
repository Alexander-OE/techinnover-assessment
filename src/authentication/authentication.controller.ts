import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AdminSignupDto, LoginDto, SignupDto } from './dto/Auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('admin/signup')
  @ApiOperation({ summary: 'Create admin' })
  @ApiResponse({
    status: 201,
    description: 'Admin successfully created',
  })
  async adminSignup(@Body() adminSignupDto: AdminSignupDto) {
    return this.authenticationService.adminSignup(
      adminSignupDto.name,
      adminSignupDto.email,
      adminSignupDto.password,
    );
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
  })
  async signUp(@Body() signupDto: SignupDto) {
    return this.authenticationService.signup(
      signupDto.name,
      signupDto.email,
      signupDto.password,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'successfully loggedin',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto.email, loginDto.password);
  }
}
