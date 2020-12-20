import {
  Resolver,
  Mutation,
  Authorized,
  Arg,
  ID,
  Ctx,
  ForbiddenError,
} from 'type-graphql';

import Comment from '../../../../entity/Comment';
import Profile from '../../../../entity/Profile';
import Post from '../../../../entity/Post';
import Context from '../../../../types/Context';
import DeleteCommentResponse from './DeleteCommentResponse';

@Resolver()
class DeleteComment {
  @Authorized()
  @Mutation(() => DeleteCommentResponse)
  async deleteComment(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<DeleteCommentResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const comment = await Comment.findOne(id, {
      loadRelationIds: { relations: ['author'] },
      relations: ['post'],
    });
    if (!comment) throw new Error('Comment not found!');
    if ((comment.author as unknown) !== profile.id) throw new ForbiddenError();

    const post = await Post.findOne(comment.post.id);
    if (!post) throw new Error('Post not found');

    await comment.remove();

    return {
      commentId: id,
      post,
    };
  }
}

export default DeleteComment;
