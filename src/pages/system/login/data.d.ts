export interface ILogin {
    mobile: string;
    password: string;
}

export const createEmptyLogin = (): ILogin => ({
    mobile: "",
    password: ""
});

export interface IUser {
    userId: string;
}
