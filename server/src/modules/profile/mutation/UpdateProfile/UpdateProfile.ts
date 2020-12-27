import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  Authorized,
  ForbiddenError,
} from 'type-graphql';

import Profile from '../../../../entity/Profile';
import Context from '../../../../types/Context';
import UpdateProfileInput from './UpdateProfileInput';

@Resolver()
class UpdateProfile {
  @Authorized()
  @Mutation(() => Profile)
  async updateProfile(
    @Arg('data')
    { id, phoneNumber, country, city, relationship }: UpdateProfileInput,
    @Ctx() ctx: Context,
  ): Promise<Profile> {
    const { profileId } = ctx;

    if (id !== profileId) throw new ForbiddenError();

    const profile = await Profile.findOne(profileId);
    if (!profile) throw new Error('Profile not found!');

    if (phoneNumber) profile.phoneNumber = phoneNumber;
    if (country) profile.country = country;
    if (city) profile.city = city;
    if (relationship) profile.relationship = relationship;

    await profile.save();

    return profile;
  }
}

export default UpdateProfile;
