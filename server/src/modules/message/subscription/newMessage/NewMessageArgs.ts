import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
class NewMessageArgs {
  @Field(() => ID)
  chatId: string;
}

export default NewMessageArgs;
