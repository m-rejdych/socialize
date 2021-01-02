import { ObjectType, Field } from 'type-graphql';

import Friendship from '../../../../entity/Friendship';
import Profile from '../../../../entity/Profile';

@ObjectType()
class CreateFriendshipResponse {
  @Field()
  friendship: Friendship;

  @Field()
  profile: Profile;

  @Field()
  friendProfile: Profile;
}

export default CreateFriendshipResponse;
