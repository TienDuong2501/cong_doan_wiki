import { User, ListParams, ListResponse } from "models";
import axiosClient from "./axiosClient";

const userApi = {
    getAll(params: ListParams): Promise<ListResponse<User>> {
        const url = '/users';
        return axiosClient.get(url, { params });
    },
}


export default userApi;