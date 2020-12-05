import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Authorized,
  ID,
  ForbiddenError,
} from 'type-graphql';

import Post from '../../../../entity/Post';
import Context from '../../../../types/Context';

@Resolver()
class DeletePost {
  @Authorized()
  @Mutation(() => String)
  async deletePost(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<string> {
    const { userId } = ctx;

    const post = await Post.findOne(id, {
      loadRelationIds: { relations: ['author'] },
    });
    if (!post) throw new Error('Post not found!');
    if ((post.author as unknown) !== userId) throw new ForbiddenError();

    await post.remove();

    return id;
  }
}

export default DeletePost;
