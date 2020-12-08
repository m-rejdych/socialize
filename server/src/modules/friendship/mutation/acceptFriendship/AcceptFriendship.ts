import { Resolver, Mutation, Arg, Ctx, Authorized, ID } from 'type-graphql';

import Friendship from '../../../../entity/Friendship';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';

@Resolver()
class AcceptFriendship {
  @Authorized()
  @Mutation(() => Friendship)
  async acceptFriendship(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<Friendship> {
    const { profileId } = ctx;

    const requestedBy = await Profile.findOne(profileId);
    if (!requestedBy) throw new Error('Profile not found!');

    const friendship = await Friendship.findOne(id, {
      relations: [
        'requestedBy',
        'addressedTo',
        'requestedBy.user',
        'addressedTo.user',
        'requestedBy.posts',
        'addressedTo.posts',
      ],
    });
    if (!friendship) throw new Error('Friendship not found!');
    if (friendship.isAccepted) throw new Error('Friendship already accepted!');
    if (friendship.addressedTo.id !== profileId)
      throw new Error('Friendship is not addressed to this user!');

    friendship.isAccepted = true;
    await friendship.save();

    return friendship;
  }
}

export default AcceptFriendship;
