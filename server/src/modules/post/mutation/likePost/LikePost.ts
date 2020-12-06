import { Resolver, Mutation, Authorized, Arg, Ctx } from 'type-graphql';

import Post from '../../../../entity/Post';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import LikePostInput from './LikePostInput';
import PostMutationResponse from '../postMutationResponse';

@Resolver()
class LikePost {
  @Authorized()
  @Mutation(() => PostMutationResponse)
  async likePost(
    @Arg('data') { id, isLiked }: LikePostInput,
    @Ctx() ctx: Context,
  ): Promise<PostMutationResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId, {
      relations: ['likedPosts', 'dislikedPosts'],
    });
    if (!profile) throw new Error('Profile not found');

    const post = await Post.findOne(id, {
      relations: ['likedBy', 'dislikedBy'],
    });
    if (!post) throw new Error('Post not found!');

    if (isLiked) {
      if (profile.likedPosts.some(({ id: postId }) => id === postId)) {
        post.likes = post.likes - 1;
        post.likedBy = post.likedBy.filter(({ id }) => id !== profile.id);
      } else {
        post.likes = post.likes + 1;
        post.likedBy = [...post.likedBy, profile];
      }
    } else {
      if (profile.dislikedPosts.some(({ id: postId }) => id === postId)) {
        post.dislikes = post.dislikes - 1;
        post.dislikedBy = post.dislikedBy.filter(({ id }) => id !== profile.id);
      } else {
        post.dislikes = post.dislikes + 1;
        post.dislikedBy = [...post.dislikedBy, profile];
      }
    }
    await post.save();

    return {
      post,
      profile,
    };
  }
}

export default LikePost;
