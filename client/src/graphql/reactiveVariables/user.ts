import { makeVar } from '@apollo/client';

interface Profile {
  id: string;
}

interface Friendship {
  id: string;
  isAccepted: boolean;
}

interface AcceptedFriendship {
  profile: Profile;
  friendship: Friendship;
}

interface AllFriendship extends AcceptedFriendship {
  requestedByMe: boolean;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  profile: {
    id: string;
    allFriends: AllFriendship[];
    acceptedFriends: AcceptedFriendship[];
  };
}

export const userVar = makeVar<User | null>(null);
