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
import CreateChatResposne from './CreateChatResponse';
import CreateChatInput from './CreateChatInput';

@Resolver()
class CreateChat {
  @Authorized()
  @Mutation(() => CreateChatResposne)
  async createChat(
    @Arg('data') { ids, type }: CreateChatInput,
    @Ctx() ctx: Context,
  ): Promise<CreateChatResposne> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId, {
      relations: ['chats', 'chats.members'],
    });
    if (!profile) throw new Error('Profile not found!');

    if (type !== 'friend' && type !== 'group')
      throw new Error('Chat type must be friend or group');

    if (ids.length < 2)
      throw new Error('There should be at least 2 chat members');

    if (profileId && !ids.includes(profileId)) throw new ForbiddenError();

    if (type === 'friend') {
      if (ids.length !== 2)
        throw new Error('Chat of type friend can have only 2 members!');
      if (
        profile.chats.some(({ members }) =>
          members.some(
            ({ id: memberId }) =>
              memberId === ids.find((id) => id !== profileId),
          ),
        )
      )
        throw new Error('Chat of type friend with this person already exists!');
    }

    if (type === 'group' && ids.length < 3)
      throw new Error('Chat of type group must have at least 3 members!');

    const members = await Profile.findByIds(ids);
    if (!members) throw new Error('Profiles not found!');

    const chat = Chat.create({
      members,
      type,
    });
    await chat.save();

    return {
      chat,
      members,
    };
  }
}

export default CreateChat;
