import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Authorized,
  ID,
  ForbiddenError,
} from 'type-graphql';

import Chat from '../../../../entity/Chat';
import Message from '../../../../entity/Message';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import DeleteMessageResponse from './DeleteMessageResponse';

@Resolver()
class DeleteMessage {
  @Authorized()
  @Mutation(() => DeleteMessageResponse)
  async deleteMessage(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<DeleteMessageResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const message = await Message.findOne(id, {
      relations: ['author', 'chat'],
    });
    if (!message) throw new Error('Message not found!');
    if (message.author.id !== profileId) throw new ForbiddenError();

    const chat = await Chat.findOne(message.chat.id, {
      relations: ['members'],
    });
    if (!chat) throw new Error('Chat not found!');
    if (!chat.members.some(({ id }) => id === profileId))
      throw new ForbiddenError();

    await message.remove();

    return {
      chat,
      messageId: id,
    };
  }
}

export default DeleteMessage;
