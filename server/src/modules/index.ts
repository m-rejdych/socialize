import Register from './user/mutation/register';
import Login from './user/mutation/login';
import User from './user/query/user';
import CreatePost from './post/mutation/createPost';
import DeletePost from './post/mutation/deletePost';
import UpdatePostContent from './post/mutation/updatePostContent';
import LikePost from './post/mutation/likePost';
import Post from './post/query/post';
import Posts from './post/query/posts';
import CreateComment from './comment/mutation/createComment';
import DeleteComment from './comment/mutation/deleteComment';
import LikeComment from './comment/mutation/likeComment';

const resolvers = [
  Register,
  Login,
  User,
  CreatePost,
  DeletePost,
  UpdatePostContent,
  LikePost,
  Post,
  Posts,
  CreateComment,
  DeleteComment,
  LikeComment,
] as const;

export default resolvers;
