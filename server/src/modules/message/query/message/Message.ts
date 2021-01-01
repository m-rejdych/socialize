import {
  Resolver,
  Query,
  Arg,
  ID,
  Authorized,
  Ctx,
  ForbiddenError,
} from 'type-graphql';

import MessageEntity from '../../../../entity/Message';
import Context from '../../../../types/Context';

@Resolver()
class Message {
  @Authorized()
  @Query(() => MessageEntity)
  async message(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<MessageEntity> {
    const message = await MessageEntity.findOne(id, {
      relations: ['chat', 'chat.members', 'readBy'],
    });
    if (!message) throw new Error('Message not found!');

    const { profileId } = ctx;
    if (!message.chat.members.some(({ id }) => id === profileId))
      throw new ForbiddenError();

    return message;
  }
}

export default Message;
