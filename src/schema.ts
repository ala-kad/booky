
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateBookInput {
    description?: Nullable<string>;
    name: string;
}

export class UpdateBookInput {
    description?: Nullable<string>;
    id: number;
    name?: Nullable<string>;
}

export class Book {
    description: string;
    id: number;
    name: string;
}

export abstract class IMutation {
    abstract createBook(createBookInput: CreateBookInput): Book | Promise<Book>;

    abstract removeBook(id: number): Nullable<Book> | Promise<Nullable<Book>>;

    abstract updateBook(updateBookInput: UpdateBookInput): Book | Promise<Book>;
}

export abstract class IQuery {
    abstract book(id: number): Nullable<Book> | Promise<Nullable<Book>>;

    abstract books(): Nullable<Book>[] | Promise<Nullable<Book>[]>;
}

type Nullable<T> = T | null;
