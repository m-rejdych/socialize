import { Resolver, Query, Arg, ID, Authorized } from 'type-graphql';

import Post from '../../../../entity/Post';

@Resolver()
class Posts {
  @Authorized()
  @Query(() => [Post])
  async posts(
    @Arg('postsIds', () => [ID]) postsIds: string[],
  ): Promise<Post[]> {
    const posts = await Post.findByIds(postsIds, {
      relations: [
        'author',
        'author.user',
        'likedBy',
        'likedBy.user',
        'dislikedBy',
        'dislikedBy.user',
        'comments',
        'comments.author',
        'comments.author.user',
      ],
    });
    if (!posts) throw new Error('Posts not found!');

    return posts;
  }
}

export default Posts;
