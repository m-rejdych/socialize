import { makeVar } from '@apollo/client';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export const userVar = makeVar<User | null>(null);
