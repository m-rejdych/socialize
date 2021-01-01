import { Resolver, Query, Authorized, Ctx } from 'type-graphql';

import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';

@Resolver()
class Profiles {
  @Authorized()
  @Query(() => [Profile])
  async profiles(@Ctx() ctx: Context): Promise<Profile[]> {
    const { profileId } = ctx;

    const profiles = await Profile.createQueryBuilder('profile')
      .where('profile.id != :profileId', { profileId })
      .leftJoinAndSelect('profile.user', 'user')
      .getMany();

    return profiles;
  }
}

export default Profiles;
