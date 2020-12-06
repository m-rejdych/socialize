import { InputType, Field, ID } from 'type-graphql';
import { IsBoolean, IsUUID } from 'class-validator';

@InputType()
class LikeCommentInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @IsBoolean()
  isLiked: boolean;
}

export default LikeCommentInput;
