import { Resolver, Query, Arg, Authorized, Ctx } from 'type-graphql';

import UserEntity from '../../../../entity/User';
import Context from '../../../../types/Context';

@Resolver()
class User {
  @Authorized()
  @Query(() => UserEntity)
  async user(
    @Arg('userId', { nullable: true }) id: string,
    @Ctx() ctx: Context,
  ): Promise<UserEntity> {
    if (!id) {
      const { userId } = ctx;
      const user = await UserEntity.findOne(userId);

      if (!user) throw new Error('User not found!');

      return user;
    }

    const user = await UserEntity.findOne(id);

    if (!user) throw new Error('User not found!');

    return user;
  }
}

export default User;
