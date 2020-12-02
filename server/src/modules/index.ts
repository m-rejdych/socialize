import TestResolver from './TestResolver';
import Register from './user/mutation/register';
import Login from './user/mutation/login';

const resolvers = [TestResolver, Register, Login] as const;

export default resolvers;
