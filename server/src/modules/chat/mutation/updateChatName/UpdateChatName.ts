import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  ForbiddenError,
} from 'type-graphql';

import Chat from '../../../../entity/Chat';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import UpdateChatNameInput from './UpdateChatNameInput';

@Resolver()
class UpdateChatName {
  @Authorized()
  @Mutation(() => Chat)
  async updateChatName(
    @Arg('data') { id, name }: UpdateChatNameInput,
    @Ctx() ctx: Context,
  ): Promise<Chat> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const chat = await Chat.findOne(id, { relations: ['members'] });
    if (!chat) throw new Error('Chat not found!');

    if (!chat.members.some(({ id }) => id === profileId))
      throw new ForbiddenError();

    chat.name = name;
    await chat.save();

    return chat;
  }
}

export default UpdateChatName;
