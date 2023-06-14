export interface UserRegisterType {
    email: string
    password: string
    firstName: string
    lastName: string
    confirmPassword: string
}

export interface UserUpdateType {
    email: string
    firstName: string
    lastName: string
    bio: string
    address: string
    phoneNumber: string
}
export interface UserAuthenticationType {
    email: string
    password: string
}

export interface UserResetPasswordType {
    password: string
    confirmPassword: string
}

export interface UserForgotPasswordType {
    email: string
}
