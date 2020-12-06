import { ObjectType, Field } from 'type-graphql';

import Post from '../../../../entity/Post';
import Profile from '../../../../entity/Profile';

@ObjectType()
class PostMutationResponse {
  @Field()
  post: Post;

  @Field()
  profile: Profile;
}

export default PostMutationResponse;
