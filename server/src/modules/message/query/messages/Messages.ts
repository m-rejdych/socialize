import {
  Resolver,
  Query,
  ID,
  Arg,
  Authorized,
  Ctx,
  ForbiddenError,
} from 'type-graphql';

import Message from '../../../../entity/Message';
import Chat from '../../../../entity/Chat';
import Context from '../../../../types/Context';

@Resolver()
class Messages {
  @Authorized()
  @Query(() => [Message], { nullable: true })
  async messages(
    @Arg('chatId', () => ID) chatId: string,
    @Ctx() ctx: Context,
  ): Promise<Message[]> {
    const { profileId } = ctx;

    const chat = await Chat.findOne(chatId, {
      relations: [
        'members',
        'messages',
        'messages.author',
        'messages.author.user',
        'messages.readBy',
      ],
    });
    if (!chat) throw new Error('Chat not found!');
    if (!chat.members.some(({ id }) => id === profileId))
      throw new ForbiddenError();

    return chat.messages;
  }
}

export default Messages;
