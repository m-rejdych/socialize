import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
class UpdateChatNameInput {
  @Field(() => ID)
  @IsUUID(4, { message: 'Invalid ID' })
  id: string;

  @Field()
  @IsNotEmpty()
  name: string;
}

export default UpdateChatNameInput;
