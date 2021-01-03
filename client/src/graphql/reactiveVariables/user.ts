import { makeVar } from '@apollo/client';

interface Profile {
  id: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  profile: Profile;
}

export const userVar = makeVar<User | null>(null);
