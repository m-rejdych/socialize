import { Resolver, Mutation, Arg, Authorized, Ctx } from 'type-graphql';

import Post from '../../../../entity/Post';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import PostMutationResponse from '../postMutationResponse';

@Resolver()
class CreatePost {
  @Authorized()
  @Mutation(() => PostMutationResponse)
  async createPost(
    @Arg('content') content: string,
    @Ctx() ctx: Context,
  ): Promise<PostMutationResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId, {
      relations: ['user', 'posts'],
    });
    if (!profile) throw new Error('Profile not found!');

    const post = Post.create({
      content,
      author: profile,
    });
    await post.save();

    return {
      post,
      profile,
    };
  }
}

export default CreatePost;
