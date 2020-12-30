import { ObjectType, Field } from 'type-graphql';

import Profile from '../../../../entity/Profile';
import Message from '../../../../entity/Message';

@ObjectType()
class MarkAsReadResponse {
  @Field()
  profile: Profile;

  @Field()
  message: Message;
}

export default MarkAsReadResponse;
