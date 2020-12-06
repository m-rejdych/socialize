import { ObjectType, Field } from 'type-graphql';

import Post from '../../../../entity/Post';
import Comment from '../../../../entity/Comment';
import Profile from '../../../../entity/Profile';

@ObjectType()
class CommentMutationResponse {
  @Field()
  comment: Comment;

  @Field()
  post: Post;

  @Field()
  profile: Profile;
}

export default CommentMutationResponse;
