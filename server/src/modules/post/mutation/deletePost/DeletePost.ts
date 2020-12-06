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
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';

@Resolver()
class DeletePost {
  @Authorized()
  @Mutation(() => String)
  async deletePost(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<string> {
    const { profileId } = ctx;

    const post = await Post.findOne(id, {
      loadRelationIds: { relations: ['author'] },
    });
    if (!post) throw new Error('Post not found!');

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    if ((post.author as unknown) !== profile.id) throw new ForbiddenError();

    await post.remove();

    return id;
  }
}

export default DeletePost;
