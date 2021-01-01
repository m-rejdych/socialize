import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  ForbiddenError,
  PubSub,
  Publisher,
} from 'type-graphql';

import Message from '../../../../entity/Message';
import Chat from '../../../../entity/Chat';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import CreateMessageResponse from './CreateMessageResponse';
import CreateMessageInput from './CreateMessageInput';
import NewMessagePayload from '../../subscription/newMessage/NewMessagePayload';

@Resolver()
class CreateMessage {
  @Authorized()
  @Mutation(() => CreateMessageResponse)
  async createMessage(
    @Arg('data') { chatId, content }: CreateMessageInput,
    @Ctx() ctx: Context,
    @PubSub('MESSAGE') publish: Publisher<NewMessagePayload>,
  ): Promise<CreateMessageResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const chat = await Chat.findOne(chatId, {
      relations: ['members', 'members.user', 'messages'],
    });
    if (!chat) throw new Error('Chat not found!');
    if (!chat.members.some(({ id }) => id === profileId))
      throw new ForbiddenError();

    const message = Message.create({
      content,
      chat,
      readBy: [profile],
      author: profile,
    });
    await message.save();
    await publish({ messageId: message.id });

    return {
      chat,
      message,
    };
  }
}

export default CreateMessage;
