import TestResolver from './TestResolver';
import Register from './user/mutation/register';

const resolvers = [TestResolver, Register] as const;

export default resolvers;
