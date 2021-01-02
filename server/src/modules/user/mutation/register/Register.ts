import { Resolver, Mutation, Arg } from 'type-graphql';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../../../../entity/User';
import Profile from '../../../../entity/Profile';
import RegisterInput from './RegisterInput';
import RegisterResponse from '../userMutationResponse';
import { TOKEN_SECRET } from '../../../../config';

@Resolver()
class Register {
  @Mutation(() => RegisterResponse)
  async register(
    @Arg('data') { email, password, firstName, lastName }: RegisterInput,
  ): Promise<RegisterResponse> {
    const foundUser = await User.findOne(
      { email },
      {
        relations: [
          'profile',
          'profile.requestedFriendships',
          'profile.requestedFriendships.addressedTo',
          'profile.requestedFriendships.addressedTo.user',
          'profile.receivedFriendships',
          'profile.receivedFriendships.requestedBy',
          'profile.receivedFriendships.requestedBy.user',
        ],
      },
    );
    if (foundUser) {
      throw new Error('This email is already in use!');
    }

    const hashedPassword = await hash(password, 12);

    const user = User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const profile = Profile.create();
    user.profile = profile;
    await user.save();

    const token = sign(
      { userId: user.id, profileId: profile.id },
      TOKEN_SECRET as string,
      {
        algorithm: 'HS256',
        expiresIn: '1h',
      },
    );

    return {
      user,
      token,
    };
  }
}

export default Register;
