export interface Post {
    _id: string,
    text: string,
    userId: {
        username: string;
    }
    movieId: {
        themeName: string;
    }
    created_at: string;
    likes?: string[];
}