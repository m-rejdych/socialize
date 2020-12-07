import { Resolver, Query, Arg, Ctx, Authorized, ID } from 'type-graphql';

import ProfileEntity from '../../../../entity/Profile';
import Context from '../../../../types/Context';

const relations = [
  'user',
  'posts',
  'likedPosts',
  'likedPosts.author',
  'likedPosts.author.user',
  'dislikedPosts',
  'dislikedPosts.author',
  'dislikedPosts.author.user',
  'likedComments',
  'likedComments.author',
  'likedComments.author.user',
  'dislikedComments',
  'dislikedComments.author',
  'dislikedComments.author.user',
];

@Resolver()
class Profile {
  @Authorized()
  @Query(() => ProfileEntity)
  async profile(
    @Arg('id', () => ID, { nullable: true }) id: string,
    @Ctx() ctx: Context,
  ): Promise<ProfileEntity> {
    if (!id) {
      const { profileId } = ctx;

      const profile = await ProfileEntity.findOne(profileId, {
        relations,
      });
      if (!profile) throw new Error('Profile not found!');

      return profile;
    }

    const profile = await ProfileEntity.findOne(id, {
      relations,
    });
    if (!profile) throw new Error('Profile not found!');

    return profile;
  }
}

export default Profile;
