import { ObjectType, Field } from 'type-graphql';

import Profile from '../../../../entity/Profile';
import Friendship from '../../../../entity/Friendship';

@ObjectType()
class AllFriendsResponse {
  @Field()
  profile: Profile;

  @Field()
  friendship: Friendship;

  @Field()
  requestedByMe: boolean;
}

export default AllFriendsResponse;
