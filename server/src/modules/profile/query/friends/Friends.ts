import { Resolver, Query, Ctx, Authorized } from 'type-graphql';

import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';

@Resolver()
class Friends {
  @Authorized()
  @Query(() => [Profile])
  async friends(@Ctx() ctx: Context): Promise<Profile[]> {
    const { profileId } = ctx;

    const profile = await Profile.createQueryBuilder('profile')
      .leftJoinAndSelect(
        'profile.requestedFriendships',
        'requestedFriendship',
        'requestedFriendship.isAccepted = :isAccepted',
        { isAccepted: true },
      )
      .leftJoinAndSelect(
        'profile.receivedFriendships',
        'receivedFriendship',
        'receivedFriendship.isAccepted = :isAccepted',
        { isAccepted: true },
      )
      .leftJoinAndSelect('requestedFriendship.addressedTo', 'addressedTo')
      .leftJoinAndSelect('addressedTo.user', 'addressedToUser')
      .leftJoinAndSelect('receivedFriendship.requestedBy', 'requestedBy')
      .leftJoinAndSelect('requestedBy.user', 'requestedByUser')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.id = :profileId', { profileId })
      .getOne();
    if (!profile) throw new Error('Profile not found!');

    const requestedFriends = profile.requestedFriendships.map(
      ({ addressedTo }) => addressedTo,
    );
    const receivedFriends = profile.receivedFriendships.map(
      ({ requestedBy }) => requestedBy,
    );

    const friends = [...requestedFriends, ...receivedFriends];

    return friends;
  }
}

export default Friends;
