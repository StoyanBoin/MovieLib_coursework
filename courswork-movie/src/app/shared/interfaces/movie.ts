export interface Movie {
    _id: string,
    themeName: string,
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
