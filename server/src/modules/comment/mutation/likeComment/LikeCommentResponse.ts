import { ObjectType, Field } from 'type-graphql';

import Comment from '../../../../entity/Comment';
import Profile from '../../../../entity/Profile';

@ObjectType()
class LikeCommentResponse {
  @Field()
  comment: Comment;

  @Field()
  profile: Profile;
}

export default LikeCommentResponse;
