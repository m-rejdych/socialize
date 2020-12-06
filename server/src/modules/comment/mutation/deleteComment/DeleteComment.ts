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
import Context from '../../../../types/Context';

@Resolver()
class DeleteComment {
  @Authorized()
  @Mutation(() => String)
  async deleteComment(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<string> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const comment = await Comment.findOne(id, {
      loadRelationIds: { relations: ['author'] },
    });
    if (!comment) throw new Error('Comment not found!');
    if ((comment.author as unknown) !== profile.id) throw new ForbiddenError();

    await comment.remove();

    return id;
  }
}

export default DeleteComment;
