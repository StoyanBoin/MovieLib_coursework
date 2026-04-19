export interface Movie {
    _id: string,
    movieName: string,
    imageUrl: string,
    year: number,
    postText: string,
    created_at: string,
    userId: {
        username: string;
    }
    subscribers: string[];
}

export interface CreateMovie {
    movieName: string,
    imageUrl: string,
    year: number,
    postText: string,
    subscribers: string,
}
