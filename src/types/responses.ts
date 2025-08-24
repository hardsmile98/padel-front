export type GetPlayerBySlugResponse = {
  player: {
    id: number;
    firstName: string;
    lastName: string;
    slug: string;
    photoUrl: string;
    raiting: number;
    description: Array<string>;
  };
  matches: {
    id: number;
    groupId: number;
    sets: Array<string>;
    winnerId: number;
    team1: {
      id: number;
      player1: {
        id: number;
        firstName: string;
        lastName: string;
        avatarUrl: string;
      };
      player2: {
        id: number;
        firstName: string;
        lastName: string;
        avatarUrl: string;
      };
    };
    team2: {
      id: number;
      player1: {
        id: number;
        firstName: string;
        lastName: string;
        avatarUrl: string;
      };
      player2: {
        id: number;
        firstName: string;
        lastName: string;
        avatarUrl: string;
      };
    };
    createdAt: string;
  }[];
};

export type GetTournamentsPlayersResponse = {
  id: number;
  firstName: string;
  lastName: string;
  slug: string;
  avatarUrl: string;
}[];