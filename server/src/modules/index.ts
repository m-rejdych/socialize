import Register from './user/mutation/register';
import Login from './user/mutation/login';
import User from './user/query/user';
import CreatePost from './post/mutation/createPost';

const resolvers = [Register, Login, User, CreatePost] as const;

export default resolvers;
