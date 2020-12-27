import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  ID,
  ForbiddenError,
} from 'type-graphql';

import Chat from '../../../../entity/Chat';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import DeleteChatResponse from './DeleteChatResponse';

@Resolver()
class DeleteChat {
  @Authorized()
  @Mutation(() => DeleteChatResponse)
  async deleteChat(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<DeleteChatResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const chat = await Chat.findOne(id, {
      loadRelationIds: { relations: ['members'] },
    });
    if (!chat) throw new Error('Chat not found!');

    const members = await Profile.findByIds(chat.members);
    if (!members) throw new Error('Members not found!');

    if (!members.some(({ id }) => id === profileId)) throw new ForbiddenError();

    await chat.remove();

    return {
      chatId: id,
      members,
    };
  }
}

export default DeleteChat;
