import { makeVar } from '@apollo/client';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profile: { id: string };
}

export const userVar = makeVar<User | null>(null);
