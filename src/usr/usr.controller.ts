import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsrService } from './usr.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators/getUser.decorator';

@Controller('user')
export class UsrController {
  constructor(private readonly usrService: UsrService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/api/external')
  ping(@User() user) {
    const userSub = user.sub;
    const email = user.email;   
    return { response: 'success!! woohoooo', userEmail: email, sub: userSub };
  }
}
