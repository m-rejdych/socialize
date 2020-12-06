import { Resolver, Mutation, Arg, Authorized, Ctx } from 'type-graphql';

import Comment from '../../../../entity/Comment';
import Post from '../../../../entity/Post';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import CommentMutationResponse from '../commentMutationResponse';
import CreateCommentInput from './CreateCommentInput';

@Resolver()
class CreateComment {
  @Authorized()
  @Mutation(() => CommentMutationResponse)
  async createComment(
    @Arg('data') { postId, content }: CreateCommentInput,
    @Ctx() ctx: Context,
  ): Promise<CommentMutationResponse> {
    const { userId } = ctx;

    const profile = await Profile.findOne({ where: { user: userId } });
    if (!profile) throw new Error('Profile not found!');

    const post = await Post.findOne(postId);
    if (!post) throw new Error('Post not found!');

    const comment = Comment.create({
      post,
      content,
      author: profile,
    });
    comment.save();

    return {
      comment,
      post,
      profile,
    };
  }
}

export default CreateComment;