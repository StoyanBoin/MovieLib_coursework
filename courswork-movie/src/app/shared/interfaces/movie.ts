export interface Movie {
    _id: string,
    themeName: string,
    // imageUrl: string,
    // year: string,
    // postText: string,
    created_at: string,
    userId: {
        username: string;
    }
    subscribers: string[];
}

export interface CreateMovie {
    themeName: string,
    postText: string,
}
