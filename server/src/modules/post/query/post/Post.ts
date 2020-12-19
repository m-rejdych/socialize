import { Resolver, Query, Authorized, Arg, ID } from 'type-graphql';

import PostEntity from '../../../../entity/Post';

@Resolver()
class Post {
  @Authorized()
  @Query(() => PostEntity)
  async post(@Arg('id', () => ID) id: string): Promise<PostEntity> {
    const post = await PostEntity.findOne(id, {
      relations: [
        'author',
        'author.user',
        'likedBy',
        'dislikedBy',
        'likedBy.user',
        'dislikedBy.user',
        'comments',
        'comments.author',
        'comments.author.user',
      ],
    });
    if (!post) throw new Error('Post not found!');

    return post;
  }
}

export default Post;
