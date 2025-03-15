
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Book {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 }) // ✅ Limits name length for database efficiency
    name: string;

    @Column({ type: 'text' }) // ✅ Allows longer descriptions
    description: string;
}
