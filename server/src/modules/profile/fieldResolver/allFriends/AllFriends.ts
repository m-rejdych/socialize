import { Resolver, FieldResolver, Root } from 'type-graphql';

import Profile from '../../../../entity/Profile';
import AllFriendsResponse from './AllFriendsResponse';

@Resolver(() => Profile)
class AllFriends {
  @FieldResolver(() => [AllFriendsResponse])
  allFriends(@Root() root: Profile): AllFriendsResponse[] {
    const requestedFriendships = root.requestedFriendships.map(
      (friendship) => ({
        profile: friendship.addressedTo,
        requestedByMe: true,
        friendship,
      }),
    );
    const receivedFriendships = root.receivedFriendships.map((friendship) => ({
      profile: friendship.requestedBy,
      requestedByMe: false,
      friendship,
    }));
    return [...requestedFriendships, ...receivedFriendships].sort((a, b) =>
      a.profile.user.fullName > b.profile.user.fullName ? -1 : 1,
    );
  }
}

export default AllFriends;
