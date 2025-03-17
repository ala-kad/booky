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

  /**
   * 
   * @param createBookInput required argument to create a new book. It contains name and description fields that are required for mutation
   * @returns Created Book entity with its propreties e.g Book { id: 1, name: 'My book', description: 'Book description' }
   */
  async create(createBookInput: CreateBookInput): Promise<Book> {
    const book = this.booksRepository.create(createBookInput);
    return await this.booksRepository.save(book);
  }

  /**
   * 
   * @returns an array of found books entities in the DB. e.g: Book [Book] / Book[] 
   */
  async findAll(): Promise<Book[]> {
    const books = await this.booksRepository.find();
    return books;
  }
  
  /**
   * 
   * @param id filter creteria to query a particular book
   * @returns Book entity with the matching id
   */
  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneByOrFail({ id });
    return book;
  }

  /**
   * 
   * @param id used as a filtering creteria to quer a particular book
   * @param updateBookInput used as an argument to pass the update inputs values. e.g: updateBookInput:{ id:1, name: "update book name" } 
   * @returns updated Book entity | NotFoundException Error
   */
  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book | null> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    await this.booksRepository.update(id, updateBookInput);
    return this.booksRepository.findOne({ where: { id } }); // Return updated book
  }

  /**
   * 
   * @param id used to find a book to delete
   * @returns Book entity with deletion status 
   */
  async remove(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneByOrFail({id});
    await this.booksRepository.remove(book);
    return book; 
  }
   
}
