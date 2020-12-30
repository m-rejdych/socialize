import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  ID,
  ForbiddenError,
} from 'type-graphql';

import Profile from '../../../../entity/Profile';
import Message from '../../../../entity/Message';
import Context from '../../../../types/Context';
import MarkAsReadResponse from './MarkAsReadResponse';

@Resolver()
class MarkAsRead {
  @Authorized()
  @Mutation(() => MarkAsReadResponse)
  async markAsRead(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<MarkAsReadResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const message = await Message.findOne(id, {
      relations: ['chat', 'chat.members', 'readBy'],
    });
    if (!message) throw new Error('Message not found!');
    if (!message.chat.members.some(({ id }) => id === profileId))
      throw new ForbiddenError();
    if (message.readBy.some(({ id }) => id === profileId))
      throw new Error('Message already read!');

    message.readBy = [...message.readBy, profile];
    await message.save();

    return {
      profile,
      message,
    };
  }
}

export default MarkAsRead;
