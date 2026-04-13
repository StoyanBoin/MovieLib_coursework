export interface Movie {
    _id: string,
    movieName: string,
    created_at: string,
    userId: {
        username: string;
    }
    subscribers: string[];
}