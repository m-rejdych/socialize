import { InputType, Field, ID } from 'type-graphql';
import { IsUUID, IsNotEmpty } from 'class-validator';

@InputType()
class CreateCommentInput {
  @Field(() => ID)
  @IsUUID(4, { message: 'Invalid ID!' })
  postId: string;

  @Field()
  @IsNotEmpty({ message: 'Content can not be empty!' })
  content: string;
}

export default CreateCommentInput;
