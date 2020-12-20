import { ObjectType, Field } from 'type-graphql';

import Post from '../../../../entity/Post';

@ObjectType()
class DeleteCommentResponse {
  @Field()
  commentId: string;

  @Field()
  post: Post;
}

export default DeleteCommentResponse;
