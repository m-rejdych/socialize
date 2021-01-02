import { ObjectType, Field } from 'type-graphql';

import Profile from '../../../../entity/Profile';
import Friendship from '../../../../entity/Friendship';

@ObjectType()
class AcceptedFriendsResponse {
  @Field()
  profile: Profile;

  @Field()
  friendship: Friendship;
}

export default AcceptedFriendsResponse;
