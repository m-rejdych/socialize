import { Resolver, Query, Arg, Authorized, Ctx, ID } from 'type-graphql';

import UserEntity from '../../../../entity/User';
import Context from '../../../../types/Context';

@Resolver()
class User {
  @Authorized()
  @Query(() => UserEntity)
  async user(
    @Arg('id', () => ID, { nullable: true }) id: string,
    @Ctx() ctx: Context,
  ): Promise<UserEntity> {
    if (!id) {
      const { userId } = ctx;
      const user = await UserEntity.findOne(userId, {
        relations: [
          'profile',
          'profile.comments',
          'profile.posts',
          'profile.posts.author',
          'profile.posts.author.user',
          'profile.likedPosts',
          'profile.dislikedPosts',
          'profile.requestedFriendships',
          'profile.requestedFriendships.addressedTo',
          'profile.requestedFriendships.addressedTo.user',
          'profile.requestedFriendships.addressedTo.posts',
          'profile.requestedFriendships.requestedBy',
          'profile.requestedFriendships.requestedBy.user',
          'profile.requestedFriendships.requestedBy.posts',
          'profile.requestedFriendships.requestedBy.posts',
          'profile.receivedFriendships',
          'profile.receivedFriendships.requestedBy',
          'profile.receivedFriendships.requestedBy.user',
          'profile.receivedFriendships.requestedBy.posts',
          'profile.receivedFriendships.addressedTo',
          'profile.receivedFriendships.addressedTo.user',
          'profile.receivedFriendships.addressedTo.posts',
        ],
      });

      if (!user) throw new Error('User not found!');

      return user;
    }

    const user = await UserEntity.findOne(id);

    if (!user) throw new Error('User not found!');

    return user;
  }
}

export default User;
