import { Subscription, Root, Resolver, Args } from 'type-graphql';

import Message from '../../../../entity/Message';
import Chat from '../../../../entity/Chat';
import NewMessageResponse from './NewMessageResponse';
import NewMessageArgs from './NewMessageArgs';
import NewMessagePayload from './NewMessagePayload';

@Resolver()
class NewMessage {
  @Subscription(() => NewMessageResponse, {
    topics: 'MESSAGE',
    filter: async ({ payload, args }) => {
      const message = await Message.findOne(payload.messageId, {
        relations: ['chat'],
      });
      if (!message) throw new Error('Message not found!');
      return message.chat.id === args.chatId;
    },
  })
  async newMessage(
    @Root() { messageId }: NewMessagePayload,
    @Args() { chatId }: NewMessageArgs,
  ): Promise<NewMessageResponse> {
    const message = await Message.findOne(messageId, { relations: ['chat'] });
    if (!message) throw new Error('Message not found!');

    const chat = await Chat.findOne(chatId, {
      relations: ['members', 'messages'],
    });
    if (!chat) throw new Error('Chat not found!');
    if (!chat.messages.some(({ id }) => id === message.id))
      throw new Error('Chat does not include this message!');

    return {
      chat,
      message,
    };
  }
}

export default NewMessage;
