import { InputType, Field, ID } from 'type-graphql';
import { IsBoolean, IsUUID } from 'class-validator';

@InputType()
class LikePostInput {
  @Field(() => ID)
  @IsUUID(4, { message: 'Invalid ID!' })
  id: string;

  @Field()
  @IsBoolean({ message: 'isLiked must be boolean!' })
  isLiked: boolean;
}

export default LikePostInput;
