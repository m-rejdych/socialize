import { ObjectType, Field } from 'type-graphql';

import Chat from '../../../../entity/Chat';
import Profile from '../../../../entity/Profile';

@ObjectType()
class CreateChatResponse {
  @Field()
  chat: Chat;

  @Field(() => [Profile])
  members: Profile[];
}

export default CreateChatResponse;
