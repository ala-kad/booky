// Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Services
import { BooksService } from './books.service';
import { ApolloService } from '../apollo/apollo.service'
import { BooksResolver } from './books.resolver';
// Entities
import { Book } from './entities/book.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksResolver, BooksService, ApolloService]
})
export class BooksModule {}
