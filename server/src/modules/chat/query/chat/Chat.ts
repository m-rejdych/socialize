import {
  Resolver,
  Query,
  Arg,
  Authorized,
  ID,
  Ctx,
  ForbiddenError,
} from 'type-graphql';

import ChatEntity from '../../../../entity/Chat';
import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';

@Resolver()
class Chat {
  @Authorized()
  @Query(() => ChatEntity)
  async chat(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ): Promise<ChatEntity> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const chatInstance = await ChatEntity.findOne(id, {
      relations: [
        'members',
        'members.user',
        'messages',
        'messages.author',
        'messages.author.user',
        'messages.readBy',
        'messages.readBy.user',
      ],
    });
    if (!chatInstance) throw new Error('Chat not found!');
    if (!chatInstance.members.some(({ id }) => id === profileId))
      throw new ForbiddenError();

    return chatInstance;
  }
}

export default Chat;
