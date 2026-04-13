export interface Post {
    _id: string,
    text: string,
    userId: {
        username: string;
    }
    movieId: {
        movieName: string;
    }
    created_at: string;
}