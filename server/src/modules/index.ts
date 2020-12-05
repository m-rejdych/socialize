import Register from './user/mutation/register';
import Login from './user/mutation/login';
import User from './user/query/user';
import CreatePost from './post/mutation/createPost';
import DeletePost from './post/mutation/deletePost';

const resolvers = [Register, Login, User, CreatePost, DeletePost] as const;

export default resolvers;
