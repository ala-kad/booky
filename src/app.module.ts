import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './authz/authz.module';
import { ConfigModule } from '@nestjs/config';
import { UsrModule } from './usr/usr.module';

@Module({
  imports: [
    AuthzModule, 
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available everywhere
    }), 
    UsrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
