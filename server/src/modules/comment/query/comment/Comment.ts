import { Resolver, Query, Arg, Authorized, ID } from 'type-graphql';

import CommentEntity from '../../../../entity/Comment';

@Resolver()
class Comment {
  @Authorized()
  @Query(() => CommentEntity)
  async comment(@Arg('id', () => ID) id: string): Promise<CommentEntity> {
    const comment = await CommentEntity.findOne(id, {
      relations: [
        'author',
        'author.user',
        'likedBy',
        'dislikedBy',
        'likedBy.user',
        'dislikedBy.user',
      ],
    });
    if (!comment) throw new Error('Comment not found!');

    return comment;
  }
}

export default Comment;
