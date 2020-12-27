import { ObjectType, Field } from 'type-graphql';

import Chat from '../../../../entity/Chat';
import Profile from '../../../../entity/Profile';

@ObjectType()
class AddRemoveChatMemberResponse {
  @Field()
  chat: Chat;

  @Field()
  profile: Profile;
}

export default AddRemoveChatMemberResponse;
