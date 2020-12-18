import { Resolver, Mutation, Arg, Authorized, Ctx } from 'type-graphql';

import Comment from '../../../../entity/Comment';
import Post from '../../../../entity/Post';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import CreateCommentResponse from './CreateCommentResponse';
import CreateCommentInput from './CreateCommentInput';

@Resolver()
class CreateComment {
  @Authorized()
  @Mutation(() => CreateCommentResponse)
  async createComment(
    @Arg('data') { postId, content }: CreateCommentInput,
    @Ctx() ctx: Context,
  ): Promise<CreateCommentResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId, {
      relations: ['comments'],
    });
    if (!profile) throw new Error('Profile not found!');

    const post = await Post.findOne(postId, { relations: ['comments'] });
    if (!post) throw new Error('Post not found!');

    const comment = Comment.create({
      post,
      content,
      author: profile,
    });
    await comment.save();

    return {
      comment,
      post,
      profile,
    };
  }
}

export default CreateComment;
