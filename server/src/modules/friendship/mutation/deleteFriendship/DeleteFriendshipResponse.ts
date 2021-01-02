import { ObjectType, Field, ID } from 'type-graphql';

import Profile from '../../../../entity/Profile';

@ObjectType()
class DeleteFriendshipResponse {
  @Field(() => ID)
  friendshipId: string;

  @Field()
  profile: Profile;

  @Field()
  friendProfile: Profile;
}

export default DeleteFriendshipResponse;
