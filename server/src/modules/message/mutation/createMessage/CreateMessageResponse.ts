import { ObjectType, Field } from 'type-graphql';

import Message from '../../../../entity/Message';
import Chat from '../../../../entity/Chat';

@ObjectType()
class CreateMessageResponse {
  @Field()
  message: Message;

  @Field()
  chat: Chat;
}

export default CreateMessageResponse;
