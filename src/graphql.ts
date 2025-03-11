
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateBookInput {
    name: string;
    description?: Nullable<string>;
}

export class UpdateBookInput {
    id: number;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export abstract class IQuery {
    abstract books(): Nullable<Book>[] | Promise<Nullable<Book>[]>;

    abstract book(id: number): Nullable<Book> | Promise<Nullable<Book>>;
}

export abstract class IMutation {
    abstract createBook(createBookInput: CreateBookInput): Book | Promise<Book>;

    abstract updateBook(updateBookInput: UpdateBookInput): Book | Promise<Book>;

    abstract removeBook(id: number): Nullable<Book> | Promise<Nullable<Book>>;
}

export class Book {
    id: number;
    name: string;
    description: string;
}

type Nullable<T> = T | null;
