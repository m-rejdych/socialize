import { Resolver, Query, Ctx, Authorized } from 'type-graphql';

import Post from '../../../../entity/Post';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';

@Resolver()
class Feed {
  @Authorized()
  @Query(() => [Post])
  async feed(@Ctx() ctx: Context): Promise<Post[]> {
    const { profileId } = ctx;

    const profile = await Profile.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.posts', 'profilePosts')
      .leftJoinAndSelect('profilePosts.author', 'profilePostsAuthor')
      .leftJoinAndSelect('profilePostsAuthor.user', 'profilePostsAuthorUser')
      .leftJoinAndSelect('profilePosts.likedBy', 'profilePostsLikedBy')
      .leftJoinAndSelect('profilePostsLikedBy.user', 'profilePostsLikedByUser')
      .leftJoinAndSelect('profilePosts.dislikedBy', 'profilePostsDislikedBy')
      .leftJoinAndSelect(
        'profilePostsDislikedBy.user',
        'profilePostsDislikedByUser',
      )
      .leftJoinAndSelect('profilePosts.comments', 'profilePostsComments')
      .leftJoinAndSelect(
        'profilePostsComments.author',
        'profilePostsCommentsAuthor',
      )
      .leftJoinAndSelect(
        'profilePostsCommentsAuthor.user',
        'profilePostsCommentsAuthorUser',
      )
      .leftJoinAndSelect(
        'profilePostsComments.likedBy',
        'profilePostsCommentsLikedBy',
      )
      .leftJoinAndSelect(
        'profilePostsCommentsLikedBy.user',
        'profilePostsCommentsLikedByUser',
      )
      .leftJoinAndSelect(
        'profilePostsComments.dislikedBy',
        'profilePostsCommentsDislikedBy',
      )
      .leftJoinAndSelect(
        'profilePostsCommentsDislikedBy.user',
        'profilePostsCommentsDislikedByUser',
      )
      .leftJoinAndSelect(
        'profile.requestedFriendships',
        'requestedFriendship',
        'requestedFriendship.isAccepted = :isAccepted',
        { isAccepted: true },
      )
      .leftJoinAndSelect(
        'profile.receivedFriendships',
        'receivedFriendship',
        'receivedFriendship.isAccepted = :isAccepted',
        { isAccepted: true },
      )
      .leftJoinAndSelect('requestedFriendship.addressedTo', 'addressedTo')
      .leftJoinAndSelect('addressedTo.posts', 'addressedToPosts')
      .leftJoinAndSelect('addressedToPosts.author', 'addressedToPostsAuthor')
      .leftJoinAndSelect(
        'addressedToPostsAuthor.user',
        'addressedToPostsAuthorUser',
      )
      .leftJoinAndSelect('addressedToPosts.likedBy', 'addressedToPostsLikedBy')
      .leftJoinAndSelect(
        'addressedToPostsLikedBy.user',
        'addressedToPostsLikedByUser',
      )
      .leftJoinAndSelect(
        'addressedToPosts.dislikedBy',
        'addressedToPostsDislikedBy',
      )
      .leftJoinAndSelect(
        'addressedToPostsDislikedBy.user',
        'addressedToPostsDislikedByUser',
      )
      .leftJoinAndSelect(
        'addressedToPosts.comments',
        'addressedToPostsComments',
      )
      .leftJoinAndSelect(
        'addressedToPostsComments.author',
        'addressedToPostsCommentsAuthor',
      )
      .leftJoinAndSelect(
        'addressedToPostsCommentsAuthor.user',
        'addressedToPostsCommentsAuthorUser',
      )
      .leftJoinAndSelect(
        'addressedToPostsComments.likedBy',
        'addressedToPostsCommentsLikedBy',
      )
      .leftJoinAndSelect(
        'addressedToPostsCommentsLikedBy.user',
        'addressedToPostsCommentsLikedByUser',
      )
      .leftJoinAndSelect(
        'addressedToPostsComments.dislikedBy',
        'addressedToPostsCommentsDislikedBy',
      )
      .leftJoinAndSelect(
        'addressedToPostsCommentsDislikedBy.user',
        'addressedToPostsCommentsDislikedByUser',
      )
      .leftJoinAndSelect('receivedFriendship.requestedBy', 'requestedBy')
      .leftJoinAndSelect('requestedBy.posts', 'requestedByPosts')
      .leftJoinAndSelect('requestedByPosts.author', 'requestedByPostsAuthor')
      .leftJoinAndSelect(
        'requestedByPostsAuthor.user',
        'requestedByPostsAuthorUser',
      )
      .leftJoinAndSelect('requestedByPosts.likedBy', 'requestedByPostsLikedBy')
      .leftJoinAndSelect(
        'requestedByPostsLikedBy.user',
        'requestedByPostsLikedByUser',
      )
      .leftJoinAndSelect(
        'requestedByPosts.dislikedBy',
        'requestedByPostsDislikedBy',
      )
      .leftJoinAndSelect(
        'requestedByPostsDislikedBy.user',
        'requestedByPostsDislikedByUser',
      )
      .leftJoinAndSelect(
        'requestedByPosts.comments',
        'requestedByPostsComments',
      )
      .leftJoinAndSelect(
        'requestedByPostsComments.author',
        'requestedByPostsCommentsAuthor',
      )
      .leftJoinAndSelect(
        'requestedByPostsCommentsAuthor.user',
        'requestedByPostsCommentsAuthorUser',
      )
      .leftJoinAndSelect(
        'requestedByPostsComments.likedBy',
        'requestedByPostsCommentsLikedBy',
      )
      .leftJoinAndSelect(
        'requestedByPostsCommentsLikedBy.user',
        'requestedByPostsCommentsLikedByUser',
      )
      .leftJoinAndSelect(
        'requestedByPostsComments.dislikedBy',
        'requestedByPostsCommentsDislikedBy',
      )
      .leftJoinAndSelect(
        'requestedByPostsCommentsDislikedBy.user',
        'requestedByPostsCommentsDislikedByUser',
      )
      .where('profile.id = :profileId', { profileId })
      .getOne();
    if (!profile) throw new Error('Profile not found!');

    const requestedFriendsPosts = profile.requestedFriendships.reduce(
      (acc, { addressedTo: { posts } }) => [...acc, ...posts],
      [] as Post[],
    );
    const receivedFriendsPosts = profile.receivedFriendships.reduce(
      (acc, { requestedBy: { posts } }) => [...acc, ...posts],
      [] as Post[],
    );

    const posts = [
      ...requestedFriendsPosts,
      ...receivedFriendsPosts,
      ...profile.posts,
    ].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

    return posts;
  }
}

export default Feed;
