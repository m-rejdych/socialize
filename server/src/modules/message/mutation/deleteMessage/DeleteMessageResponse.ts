import { ObjectType, Field, ID } from 'type-graphql';

import Chat from '../../../../entity/Chat';

@ObjectType()
class DeleteMessageResponse {
  @Field()
  chat: Chat;

  @Field(() => ID)
  messageId: string;
}

export default DeleteMessageResponse;
