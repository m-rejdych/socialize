import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  ID,
  Ctx,
  ForbiddenError,
} from 'type-graphql';

import Chat from '../../../../entity/Chat';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import CreateChatResposne from './CreateChatResponse';

@Resolver()
class CreateChat {
  @Authorized()
  @Mutation(() => CreateChatResposne)
  async createChat(
    @Arg('ids', () => [ID]) ids: string[],
    @Ctx() ctx: Context,
  ): Promise<CreateChatResposne> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    if (ids.length < 2)
      throw new Error("There should be at least 2 chat members");
    if (profileId && !ids.includes(profileId)) throw new ForbiddenError();

    const members = await Profile.findByIds(ids);
    if (!members) throw new Error('Profiles not found!');

    const chat = Chat.create({
      members,
    });
    await chat.save();

    return {
      chat,
      members,
    };
  }
}

export default CreateChat;
