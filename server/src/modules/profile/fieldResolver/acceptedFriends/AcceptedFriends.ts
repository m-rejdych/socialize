import { Resolver, FieldResolver, Root } from 'type-graphql';

import Profile from '../../../../entity/Profile';
import AcceptedFriendsResponse from './AcceptedFriendsResponse';

@Resolver(() => Profile)
class AcceptedFriends {
  @FieldResolver(() => [AcceptedFriendsResponse])
  acceptedFriends(@Root() root: Profile): AcceptedFriendsResponse[] {
    const requestedFriendships = root.requestedFriendships
      .filter(({ isAccepted }) => isAccepted)
      .map((friendship) => ({ profile: friendship.addressedTo, friendship }));
    const receivedFriendships = root.receivedFriendships
      .filter(({ isAccepted }) => isAccepted)
      .map((friendship) => ({ profile: friendship.requestedBy, friendship }));
    return [...requestedFriendships, ...receivedFriendships].sort((a, b) =>
      a.profile.user.fullName > b.profile.user.fullName ? -1 : 1,
    );
  }
}

export default AcceptedFriends;
