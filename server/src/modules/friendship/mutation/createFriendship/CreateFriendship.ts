import { Resolver, Mutation, Arg, Authorized, ID, Ctx } from 'type-graphql';

import Friendship from '../../../../entity/Friendship';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import CreateFriendshipResponse from './CreateFriendshipResponse';

@Resolver()
class CreateFriendship {
  @Authorized()
  @Mutation(() => CreateFriendshipResponse)
  async createFriendship(
    @Arg('addressedToId', () => ID) addressedToId: string,
    @Ctx() ctx: Context,
  ): Promise<CreateFriendshipResponse> {
    const { profileId } = ctx;

    const requestedBy = await Profile.findOne(profileId, {
      relations: ['user', 'posts'],
    });
    if (!requestedBy) throw new Error('Profile not found!');

    const addressedTo = await Profile.findOne(addressedToId, {
      relations: ['user', 'posts'],
    });
    if (!addressedTo) throw new Error('Profile not found!');

    const foundFirstFriendship = await Friendship.findOne({
      where: { requestedBy: profileId, addressedTo: addressedToId },
    });
    if (foundFirstFriendship) throw new Error('Friendship already exists!');

    const foundSecondFriendship = await Friendship.findOne({
      where: { requestedBy: addressedToId, addressedTo: profileId },
    });
    if (foundSecondFriendship) throw new Error('Friendship already exists!');

    const friendship = Friendship.create({
      requestedBy,
      addressedTo,
    });
    await friendship.save();

    return {
      friendship,
      profile: requestedBy,
      friendProfile: addressedTo,
    };
  }
}

export default CreateFriendship;
