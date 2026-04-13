export interface User {
    _id: string,
    username: string,
    email: string,
    telephone?: string,
}
export interface UserWithPassword extends User {
    password: string,
}