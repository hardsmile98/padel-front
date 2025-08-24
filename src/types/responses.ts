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

export type GetActiveTournamentResponse = {
  tournament: {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
    currentStageId: number | null;
  };
  stages: {
    id: number;
    tournamentId: number;
    name: string;
    order: number;
    createdAt: string;
  }[];
  categories: {
    id: number;
    tournamentId: number;
    stageId: number;
    parentCategoryId: number | null;
    name: string;
    order: number;
    createdAt: string;
  }[];
  groups: {
    id: number;
    tournamentId: number;
    stageId: number;
    categoryId: number | null;
    name: string;
    createdAt: string;
  }[];
}

export type GetGroupStatisticsResponse = {
  group: {
    id: number;
    tournamentId: number;
    stageId: number;
    categoryId: number;
    name: string;
    createdAt: string;
  };
  matches: {
    id: number;
    groupId: number;
    sets: string[];
    winnerId: number;
    createdAt: string;
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
  }[];
  teams: {
    id: number;
    player1Id: number;
    player2Id: number;
    player1: {
      id: number;
      firstName: string;
      lastName: string;
    };
    player2: {
      id: number;
      firstName: string;
      lastName: string;
    };
    createdAt: string;
  }[];
};