import { Resolver, Query, Ctx, Authorized } from 'type-graphql';

import Post from '../../../../entity/Post';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';

@Resolver()
class Feed {
  @Authorized()
  @Query(() => [Post])
  async feed(@Ctx() ctx: Context): Promise<Post[]> {
    const { profileId } = ctx;

    const profile = await Profile.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.posts', 'profilePosts')
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
      .leftJoinAndSelect('addressedTo.posts', 'addressedToPosts')
      .leftJoinAndSelect('receivedFriendship.requestedBy', 'requestedBy')
      .leftJoinAndSelect('requestedBy.posts', 'requestedByPosts')
      .where('profile.id = :profileId', { profileId })
      .getOne();
    if (!profile) throw new Error('Profile not found!');

    const requestedFriendsPosts = profile.requestedFriendships.reduce(
      (acc, { addressedTo: { posts } }) => [...acc, ...posts],
      [] as Post[],
    );
    const receivedFriendsPosts = profile.receivedFriendships.reduce(
      (acc, { requestedBy: { posts } }) => [...acc, ...posts],
      [] as Post[],
    );

    const posts = [
      ...requestedFriendsPosts,
      ...receivedFriendsPosts,
      ...profile.posts,
    ].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

    return posts;
  }
}

export default Feed;
