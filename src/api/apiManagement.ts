import { Api, ListParams, ListResponse } from "models";
import axiosClient from "./axiosClient";
interface ApiFormValues {
	id: number | string;
	status: string;
	fileUploads: []
}
interface importSwagger {
	with_documentation: boolean,
    with_path_mapping: boolean,
    with_policy_paths: boolean,
    type: string,
    payload: string,
    format: string,
    [key: string]: any
}
const apiManagement = {
    getAll(params: ListParams): Promise<ListResponse<Api>> {
        const url = '/apis';
        return axiosClient.get(url, { params });
    },

    add(data: any): Promise<ApiFormValues> {
        const url = '/apis';
        return axiosClient.post(url, data);
    },
    show(id: String): Promise<Api> {
        const url = `/apis/${id}`;
        return axiosClient.get(url);
    },
    update(id: String, data: any): Promise<ApiFormValues> {
        const url = `/apis/edit/${id}`;
        return axiosClient.patch(url, data);
    },

    importSwagger(data: any): Promise<importSwagger> {
        const url = '/apis/import-swagger';
        return axiosClient.post(url, data);
    },
    importUrl(data: any): Promise<importSwagger> {
        const url = '/apis/import-url';
        return axiosClient.post(url, data);
    },

    remove(id: string): Promise<any> {
        const url = `/apis/${id}`;
        return axiosClient.delete(url);
    }

}


export default apiManagement;