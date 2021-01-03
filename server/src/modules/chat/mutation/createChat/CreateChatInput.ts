import { InputType, ID, Field } from 'type-graphql';

@InputType()
class CreateChatInput {
  @Field(() => [ID])
  ids: string[];

  @Field()
  type: 'friend' | 'group';
}

export default CreateChatInput;
