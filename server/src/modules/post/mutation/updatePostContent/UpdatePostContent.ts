import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  ForbiddenError,
} from 'type-graphql';

import Post from '../../../../entity/Post';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import UpdatePostContentInput from './UpdatePostContentInput';

@Resolver()
class UpdatePostContent {
  @Authorized()
  @Mutation(() => Post)
  async updatePostContent(
    @Arg('data') { id, content }: UpdatePostContentInput,
    @Ctx() ctx: Context,
  ): Promise<Post> {
    const { userId } = ctx;

    const profile = await Profile.findOne({ where: { user: userId } });
    if (!profile) throw new Error('Profile not found!');

    const post = await Post.findOne(id, {
      loadRelationIds: { relations: ['author'] },
    });
    if (!post) throw new Error('Post not found!');
    if ((post.author as unknown) !== profile.id) throw new ForbiddenError();

    post.content = content;
    await post.save();

    return post;
  }
}

export default UpdatePostContent;
