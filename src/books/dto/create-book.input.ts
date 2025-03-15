import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBookInput {
    @Field()
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

    @Field()
    @IsNotEmpty({ message: 'Description cannot be empty' })
    description: string;
}
