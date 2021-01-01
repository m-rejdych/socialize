import { ObjectType, Field } from 'type-graphql';

import Chat from '../../../../entity/Chat';
import Message from '../../../../entity/Message';

@ObjectType()
class NewMessageResponse {
  @Field()
  chat: Chat;

  @Field()
  message: Message;
}

export default NewMessageResponse;
