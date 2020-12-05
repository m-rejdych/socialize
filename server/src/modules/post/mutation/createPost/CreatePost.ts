import { Resolver, Mutation, Arg, Authorized, Ctx } from 'type-graphql';

import Post from '../../../../entity/Post';
import User from '../../../../entity/User';
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

    const user = await User.findOne(userId);

    const post = Post.create({
      content,
      likes: 0,
      dislikes: 0,
      author: user,
    });
    await post.save();

    return post;
  }
}

export default CreatePost;
