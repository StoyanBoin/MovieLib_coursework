export interface Movie {
    _id: string,
    movieName: string,
    imageUrl: string,
    year: string,
    postText: string,
    created_at: string,
    userId: {
        username: string;
    }
    subscribers: string[];
}

export interface CreateMovie {
    themeName: string,
    subscribers: string,
    postText: string,
}
