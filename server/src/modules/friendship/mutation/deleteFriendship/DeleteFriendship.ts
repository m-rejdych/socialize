import { Resolver, Mutation, Arg, Authorized, Ctx, ID } from 'type-graphql';

import Friendship from '../../../../entity/Friendship';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import DeleteFriendshipResponse from './DeleteFriendshipResponse';

@Resolver()
class DeleteFriendship {
  @Authorized()
  @Mutation(() => DeleteFriendshipResponse)
  async deleteFriendship(
    @Arg('friendId', () => ID) friendId: string,
    @Ctx() ctx: Context,
  ): Promise<DeleteFriendshipResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const friendProfile = await Profile.findOne(friendId);
    if (!friendProfile) throw new Error('Profile not found!');

    const receivedFriendship = await Friendship.createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.addressedTo', 'addressedTo')
      .leftJoinAndSelect('friendship.requestedBy', 'requestedBy')
      .where('addressedTo.id = :profileId', { profileId })
      .andWhere('requestedBy.id = :friendId', { friendId })
      .getOne();

    if (!receivedFriendship) {
      const requestedFriendship = await Friendship.createQueryBuilder(
        'friendship',
      )
        .leftJoinAndSelect('friendship.addressedTo', 'addressedTo')
        .leftJoinAndSelect('friendship.requestedBy', 'requestedBy')
        .where('addressedTo.id = :friendId', { friendId })
        .andWhere('requestedBy.id = :profileId', { profileId })
        .getOne();
      if (!requestedFriendship) throw new Error('Friendship not found!');

      const id = requestedFriendship.id;
      await requestedFriendship.remove();

      return {
        friendshipId: id,
        profile,
        friendProfile,
      };
    }

    const id = receivedFriendship.id;
    await receivedFriendship.remove();

    return {
      friendshipId: id,
      profile,
      friendProfile,
    };
  }
}

export default DeleteFriendship;
