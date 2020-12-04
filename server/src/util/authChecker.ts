import { AuthChecker } from 'type-graphql';

import User from '../entity/User';
import Context from '../types/Context';

const authChecker: AuthChecker<Context> = async ({ context }) => {
  const { userId } = context;
  if (!userId) return false;

  const user = await User.findOne(userId);
  if (!user) return false;

  return true;
};

export default authChecker;
