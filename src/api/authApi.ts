import { ListParams, ListResponse, User } from "models";
import axiosClient from "./axiosClient";
import { LoginPayload, SignupPayload } from "../features/auth/authSlice"


const authApi = {
    SignIn(params: LoginPayload): Promise<User> {
        const url = '/auth/signin';
        return axiosClient.post(url, { username: params.username, password: params.password, login_type: params.login_type });
    },

    SignUp(params: SignupPayload): Promise<User> {
        const url = '/auth/signup';
        return axiosClient.post(url, { firstName: params.firstName, lastName: params.lastName, username: params.username, email: params.email, password: params.password, password_confirmation: params.password_confirmation });
    },

}

export default authApi;