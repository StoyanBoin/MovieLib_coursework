export interface User {
    _id: string,
    username: string,
    email: string,
    tel?: string,
    themes?: string[],
    posts?: string[],
    created_at?: string,
}
export interface UserForAuth {
    username: string,
    email: string,
    password: string,
    telephone?: string,
}

export interface LoginCredentials {
    email: string,
    password: string,
}

export interface ProfileUpdate {
    username: string,
    email: string,
    telephone?: string,
}