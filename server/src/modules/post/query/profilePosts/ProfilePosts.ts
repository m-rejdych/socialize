import { Resolver, Query, Arg, Ctx, Authorized, ID } from 'type-graphql';

import Post from '../../../../entity/Post';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';

@Resolver()
class ProfilePosts {
  @Authorized()
  @Query(() => [Post])
  async profilePosts(
    @Arg('id', () => ID, { nullable: true }) id: string,
    @Ctx() ctx: Context,
  ): Promise<Post[]> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found');

    if (!id) {
      const posts = await Post.find({
        where: { author: profileId },
        relations: [
          'author',
          'author.user',
          'likedBy',
          'dislikedBy',
          'likedBy.user',
          'dislikedBy.user',
          'comments',
          'comments.author',
          'comments.author.user',
          'comments.likedBy',
          'comments.dislikedBy',
          'comments.likedBy.user',
          'comments.dislikedBy.user',
        ],
      });
      if (!posts) throw new Error('Posts not found!');
      return posts;
    }

    const posts = await Post.find({
      where: { author: id },
      relations: [
        'author',
        'author.user',
        'likedBy',
        'dislikedBy',
        'likedBy.user',
        'dislikedBy.user',
        'comments',
        'comments.author',
        'comments.author.user',
        'comments.likedBy',
        'comments.dislikedBy',
        'comments.likedBy.user',
        'comments.dislikedBy.user',
      ],
    });
    if (!posts) throw new Error('Posts not found!');
    return posts;
  }
}

export default ProfilePosts;
