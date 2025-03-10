import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const book = this.booksRepository.create(createBookInput);
    return this.booksRepository.save(book);
  }

  // TO-DO FIX
  async findAll(): Promise<Book[]> {
    const books = await this.booksRepository.find();
    return books
  }
  // TO-DO FIX
  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneByOrFail({ id });
    return book;
  }

  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book | null> {
    await this.booksRepository.update(id, updateBookInput);
    return this.booksRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const book = await this.booksRepository.findOneByOrFail({id});
    await this.booksRepository.delete(book);
  }
}
