//  Modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthzModule } from './authz/authz.module';
import { UsrModule } from './usr/usr.module';
import { BooksModule } from './books/books.module';
// Services
import { AppService } from './app.service';
// Drivers
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// Controllers
import { AppController } from './app.controller';
// Utils
import { join } from 'path';
// Entities
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    AuthzModule, 
    UsrModule,
    BooksModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available everywhere
    }), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./src/**/*.graphql'],
      definitions: {
       path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'booky.sqlite'), // Save the database file in the root folder'
      entities: [Book],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
