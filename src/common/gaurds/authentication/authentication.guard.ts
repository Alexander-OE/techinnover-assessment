import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException(
        'Token not found or invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);

      if (decodedToken.isBanned) {
        throw new UnauthorizedException('User is banned');
      }

      const { id, email, isBanned, role } = decodedToken;
      request.user = { id, email, isBanned, role };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
