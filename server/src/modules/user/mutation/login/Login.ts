import { ObjectType, Mutation, Arg } from 'type-graphql';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../../../../entity/User';
import Profile from '../../../../entity/Profile';
import LoginResponse from '../userMutationResponse';
import LoginInput from './LoginInput';
import { TOKEN_SECRET } from '../../../../config';

@ObjectType()
class Login {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('data') { email, password }: LoginInput,
  ): Promise<LoginResponse> {
    const user = await User.findOne({ email }, { relations: ['profile'] });
    if (!user) throw new Error('Wrong email or password!');

    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new Error('Wrong email or password!');
    }

    const profile = await Profile.findOne({ where: { user: user.id } });
    if (!profile) throw new Error('Profile not found!');

    const token = sign(
      { userId: user.id, profileId: profile.id },
      TOKEN_SECRET as string,
      {
        algorithm: 'HS256',
        expiresIn: '1h',
      },
    );

    return { user, token };
  }
}

export default Login;
