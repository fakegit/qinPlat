import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { SettingService } from '../modules/setting/setting.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly settingService: SettingService) {}

  async use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token) {
      try {
        const user = await this.settingService.validateToken(token);
        req.user = 'admin';
      } catch (error) {
        req.user = null;
      }
    }

    next();
  }
}
