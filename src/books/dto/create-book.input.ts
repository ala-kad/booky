import { InputType, Field } from '@nestjs/graphql';

export class CreateBookInput {
    @Field()
    name: string;
  
    @Field({ nullable: true })
    description?: string;
}
