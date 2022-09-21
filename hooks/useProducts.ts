import useSWR, { SWRConfiguration } from "swr";
import { SeedProduct } from "../database/products";


type ResponseData = {
    products: SeedProduct[],
    message: string

}

const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json());

export const useProducts = (url: string, configSWR: SWRConfiguration = {}) => {

    // const { data, error } = useSWR<ResponseData>(`/api/${url}`, fetcher, configSWR);
    const { data, error } = useSWR<ResponseData>(`/api/${url}`, configSWR);


    return {

        products: data?.products,
        isLoading: !error && !data,
        isError: error,
    }
}