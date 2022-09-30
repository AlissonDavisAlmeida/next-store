import useSWR, { SWRConfiguration } from "swr";
import { SeedProduct } from "../database/products";


type ResponseData = {
    products: SeedProduct[];
    message: string

}


export const useProducts = <T>(url: string, configSWR: SWRConfiguration = {}) => {

    const { data, error } = useSWR<ResponseData>(`/api/${url}`, configSWR);


    return {

        products: data?.products,
        isLoading: !error && !data,
        isError: error,
    }
}