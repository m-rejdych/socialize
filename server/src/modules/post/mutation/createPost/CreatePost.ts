import { Resolver, Mutation, Arg, Authorized, Ctx } from 'type-graphql';

import Post from '../../../../entity/Post';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';

@Resolver()
class CreatePost {
  @Authorized()
  @Mutation(() => Post)
  async createPost(
    @Arg('content') content: string,
    @Ctx() ctx: Context,
  ): Promise<Post> {
    const { userId } = ctx;

    const profile = await Profile.findOne({ where: { user: userId } });
    if (!profile) throw new Error('Profile not found!');

    const post = Post.create({
      content,
      author: profile,
    });
    await post.save();

    return post;
  }
}

export default CreatePost;
