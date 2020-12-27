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
import AddRemoveChatMemberResponse from './AddRemoveChatMemberResponse';
import AddRemoveChatMemberInput from './AddRemoveChatMemberInput';

@Resolver()
class AddRemoveChatMember {
  @Authorized()
  @Mutation(() => AddRemoveChatMemberResponse)
  async addRemoveChatMember(
    @Arg('data')
    { chatId, profileId: memberId, toRemove = false }: AddRemoveChatMemberInput,
    @Ctx() ctx: Context,
  ): Promise<AddRemoveChatMemberResponse> {
    const { profileId } = ctx;

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    const chat = await Chat.findOne(chatId, { relations: ['members'] });
    if (!chat) throw new Error('Chat not found!');

    if (!chat.members.some(({ id }) => id === profileId))
      throw new ForbiddenError();

    const profileToAdd = await Profile.findOne(memberId);
    if (!profileToAdd) throw new Error('Profile not found!');

    if (!toRemove) {
      if (chat.members.some(({ id }) => id === profileToAdd.id))
        throw new Error('This profile is already a mamber of the chat!');

      chat.members = [...chat.members, profileToAdd];
    } else {
      if (!chat.members.some(({ id }) => id === profileToAdd.id))
        throw new Error('This profile is not a mamber of the chat!');

      chat.members = chat.members.filter(({ id }) => id !== memberId);
    }

    await chat.save();

    return {
      chat,
      profile: profileToAdd,
    };
  }
}

export default AddRemoveChatMember;
