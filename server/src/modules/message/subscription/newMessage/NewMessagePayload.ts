import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
class NewMessagePayload {
  @Field(() => ID)
  messageId: string;
}

export default NewMessagePayload;
