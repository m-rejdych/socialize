import { ObjectType, Field } from 'type-graphql';

import Profile from '../../../../entity/Profile';

@ObjectType()
class DeleteChatResponse {
  @Field()
  chatId: string;

  @Field(() => [Profile])
  members: Profile[];
}

export default DeleteChatResponse;
