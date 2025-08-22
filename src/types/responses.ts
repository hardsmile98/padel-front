export type GetPlayerBySlugResponse = {
    player: {
        id: number;
        firstName: string;
        lastName: string;
        slug: string;
        photoUrl: string;
        raiting: number;
        description: Array<string>;
    }
}