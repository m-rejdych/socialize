// import { Resolver, Mutation, Authorized, Arg, ID, Ctx } from 'type-graphql';

// import Comment from '../../../../entity/Comment';
// import Profile from '../../../../entity/Profile';
// import Post from '../../../../entity/Post';
// import Context from '../../../../types/Context';
// import CommentMutationResponse from '../commentMutationResponse';

// @Resolver()
// class DeleteComment {
//   @Authorized()
//   @Mutation(() => CommentMutationResponse)
//   async deleteComment(@Arg('id', () => ID) id: string, @Ctx() ctx: Context): Promise<CommentMutationResponse> {
//     const { userId } = ctx;

//     const comment = await Comment.findOne(id, { relations: ['post', 'post.user', 'author', 'author.user'], loadRelationIds: { relations: ['author'] } });
//     if (!comment) throw new Error('Comment not found!');

//     const profile
//   }
// }
