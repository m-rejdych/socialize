import { Resolver, Query, Arg, Authorized, ID, Ctx } from 'type-graphql';

import Comment from '../../../../entity/Comment';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';

@Resolver()
class ProfileComments {
  @Authorized()
  @Query(() => [Comment])
  async profileComments(
    @Arg('id', () => ID, { nullable: true }) id: string,
    @Ctx() ctx: Context,
  ): Promise<Comment[]> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    if (!id) {
      const comments = await Comment.find({
        where: { author: profileId },
        relations: [
          'author',
          'author.user',
          'likedBy',
          'dislikedBy',
          'likedBy.user',
          'dislikedBy.user',
        ],
      });
      if (!comments) throw new Error('Comments not found!');
      return comments;
    }

    const comments = await Comment.find({
      where: { author: id },
      relations: [
        'author',
        'author.user',
        'likedBy',
        'dislikedBy',
        'likedBy.user',
        'dislikedBy.user',
      ],
    });
    if (!comments) throw new Error('Comments not found!');
    return comments;
  }
}

export default ProfileComments;
