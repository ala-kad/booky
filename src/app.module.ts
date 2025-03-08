import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './authz/authz.module';
import { ConfigModule } from '@nestjs/config';
import { UsrModule } from './usr/usr.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    AuthzModule, 
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available everywhere
    }), 
    UsrModule,
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    typePaths: ['./src/**/*.graphql'],
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
      outputAs: 'class',
    },
  }),
  BooksModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'booky',
    entities: [Book],
    synchronize: true,
    autoLoadEntities: true,
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
