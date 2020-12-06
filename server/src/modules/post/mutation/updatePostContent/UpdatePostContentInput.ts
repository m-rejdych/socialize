import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
class UpdatePostContentInput {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty()
  content: string;
}

export default UpdatePostContentInput;
