import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

import { Book } from './entities/book.entity';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book) 
  createBook(@Args('createBookInput') createBookInput: CreateBookInput): Promise<Book>{
    return this.booksService.create(createBookInput);
  }

  @Query('books')
  findAll() {
    return this.booksService.findAll();
  }

  @Query('book')
  findOne(@Args('id') id: number) {
    return this.booksService.findOne(id);
  }

  @Mutation('updateBook')
  update(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation('removeBook')
  remove(@Args('id') id: number) {
    return this.booksService.remove(id);
  }
}
