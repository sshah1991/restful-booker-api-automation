// format of what we send and what we receive

export interface AuthRequest{
    username: string
    password: string
}

export interface AuthResponse{
    token: string
    reason?: string //"The property reason might be there, or it might be undefined." "this only appears if login fails"
}