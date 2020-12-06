import { Resolver, Query, Arg, ID, Authorized } from 'type-graphql';

import Post from '../../../../entity/Post';

@Resolver()
class Posts {
  @Authorized()
  @Query(() => [Post])
  async posts(
    @Arg('postsIds', () => [ID]) postsIds: string[],
  ): Promise<Post[]> {
    const posts = await Post.findByIds(postsIds);
    if (!posts) throw new Error('Posts not found!');

    return posts;
  }
}

export default Posts;
