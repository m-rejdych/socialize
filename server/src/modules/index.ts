import Register from './user/mutation/register';
import Login from './user/mutation/login';
import User from './user/query/user';
import CreatePost from './post/mutation/createPost';
import DeletePost from './post/mutation/deletePost';
import UpdatePostContent from './post/mutation/updatePostContent';
import LikePost from './post/mutation/likePost';
import Post from './post/query/post';
import CreateComment from './comment/mutation/createComment';

const resolvers = [
  Register,
  Login,
  User,
  CreatePost,
  DeletePost,
  UpdatePostContent,
  LikePost,
  Post,
  CreateComment,
] as const;

export default resolvers;
