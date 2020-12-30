import { InputType, Field, ID } from 'type-graphql';
import { IsUUID, IsString } from 'class-validator';

@InputType()
class CreateMessageInput {
  @Field(() => ID)
  @IsUUID(4, { message: 'Invalid ID!' })
  chatId: string;

  @Field()
  @IsString({ message: 'Content should be a stirng!' })
  content: string;
}

export default CreateMessageInput;
