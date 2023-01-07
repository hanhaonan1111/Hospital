export type User = {
    /** token令牌 */
    token: string
    refreshToken: string
    avatar: string
    mobile: string
};
export type params = {
    mobile: string,
    password: string
}
export type Codeparams = {
    mobile: string,
    code: string
}
