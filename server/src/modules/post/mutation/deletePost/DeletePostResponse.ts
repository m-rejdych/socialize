import { ObjectType, Field } from 'type-graphql';

import Profile from '../../../../entity/Profile';

@ObjectType()
class DeletePostResponse {
  @Field()
  id: string;

  @Field()
  profile: Profile;
}

export default DeletePostResponse;
