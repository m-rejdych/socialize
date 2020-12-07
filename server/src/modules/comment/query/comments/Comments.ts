import { Resolver, Query, ID, Arg, Authorized } from 'type-graphql';

import Comment from '../../../../entity/Comment';

@Resolver()
class Comments {
  @Authorized()
  @Query(() => [Comment])
  async comments(@Arg('ids', () => [ID]) ids: string[]): Promise<Comment[]> {
    const comments = Comment.findByIds(ids, {
      relations: [
        'author',
        'author.user',
        'likedBy',
        'dislikedBy',
        'likedBy.user',
        'dislikedBy.user',
      ],
    });
    if (!comments) throw new Error('Comments not found!');

    return comments;
  }
}

export default Comments;
