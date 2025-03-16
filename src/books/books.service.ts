import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
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

  async findAll(): Promise<Book[]> {
    const books = await this.booksRepository.find();
    return books;
  }
  
  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneByOrFail({ id });
    return book;
  }

  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book | null> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    await this.booksRepository.update(id, updateBookInput);
    return this.booksRepository.findOne({ where: { id } }); // Return updated book
  }

  async remove(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneByOrFail({id});
    await this.booksRepository.remove(book);
    return book; 
  }
   
}
