import { InputType, Field } from 'type-graphql';
import { IsBoolean, IsUUID } from 'class-validator';

@InputType()
class LikePostInput {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsBoolean()
  isLiked: boolean;
}

export default LikePostInput;
