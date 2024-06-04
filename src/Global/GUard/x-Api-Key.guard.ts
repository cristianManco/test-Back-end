import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    if (apiKey === process.env.API_KEY) {
      return true;
    } else {
      throw new UnauthorizedException('Invalid API key');
    }
  }
}
