import { InputType, Field, ID } from 'type-graphql';
import { IsUUID, IsBoolean } from 'class-validator';

@InputType()
class AddRemoveChatMemberInput {
  @Field(() => ID)
  @IsUUID(4, { message: 'Invalid ID!' })
  chatId: string;

  @Field(() => ID)
  @IsUUID(4, { message: 'Invalid ID!' })
  profileId: string;

  @Field({ nullable: true })
  @IsBoolean({ message: 'toRemove should be a boolean!' })
  toRemove: boolean;
}

export default AddRemoveChatMemberInput;
