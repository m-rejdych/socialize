import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';

import Comment from '../../../../entity/Comment';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import LikeCommentInput from './LikeCommentInput';
import LikeCommentResponse from './LikeCommentResponse';

@Resolver()
class LikeComment {
  @Authorized()
  @Mutation(() => LikeCommentResponse)
  async likeComment(
    @Arg('data') { id, isLiked }: LikeCommentInput,
    @Ctx() ctx: Context,
  ): Promise<LikeCommentResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const comment = await Comment.findOne(id, {
      relations: ['likedBy', 'dislikedBy'],
    });
    if (!comment) throw new Error('Comment not found!');

    if (isLiked) {
      if (comment.likedBy.some(({ id }) => id === profileId)) {
        comment.likes = comment.likes - 1;
        comment.likedBy = comment.likedBy.filter(({ id }) => id !== profileId);
      } else {
        comment.likes = comment.likes + 1;
        comment.likedBy = [...comment.likedBy, profile];
      }
    } else {
      if (comment.dislikedBy.some(({ id }) => id === profileId)) {
        comment.dislikes = comment.dislikes - 1;
        comment.dislikedBy = comment.dislikedBy.filter(
          ({ id }) => id !== profileId,
        );
      } else {
        comment.dislikes = comment.dislikes + 1;
        comment.dislikedBy = [...comment.dislikedBy, profile];
      }
    }
    await comment.save();

    return {
      comment,
      profile,
    };
  }
}

export default LikeComment;
