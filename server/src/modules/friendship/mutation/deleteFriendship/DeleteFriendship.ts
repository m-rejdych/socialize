import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  ID,
  ForbiddenError,
} from 'type-graphql';

import Friendship from '../../../../entity/Friendship';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import DeleteFriendshipResponse from './DeleteFriendshipResponse';

@Resolver()
class DeleteFriendship {
  @Authorized()
  @Mutation(() => DeleteFriendshipResponse)
  async deleteFriendship(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<DeleteFriendshipResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const friendship = await Friendship.findOne(id, {
      relations: ['requestedBy', 'addressedTo'],
    });
    if (!friendship) throw new Error('Friendship not found!');
    if (
      friendship.addressedTo.id !== profileId &&
      friendship.requestedBy.id !== profileId
    )
      throw new ForbiddenError();

    const friendId =
      friendship.addressedTo.id === profileId
        ? friendship.requestedBy.id
        : friendship.addressedTo.id;
    const friendProfile = await Profile.findOne(friendId);
    if (!friendProfile) throw new Error('Profile not found!');

    await friendship.remove();

    return {
      friendshipId: id,
      profile,
      friendProfile,
    };
  }
}

export default DeleteFriendship;
