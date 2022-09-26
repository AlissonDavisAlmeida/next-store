import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLAyout } from '../../components/layout'
import { ProductsList, ProductWithId } from '../../components/products'
import { Loading } from '../../components/ui/Loading'
import { useProducts } from '../../hooks'



const KidsPage: NextPage = () => {

    const { products, isError, isLoading } = useProducts("products?gender=kid")


    return (
        <ShopLAyout
            title='Shop for Kid'
            pageDescription="Kid's clothes Page"
        >
            <Typography variant="h1" component={"h1"}>
                Store Page
            </Typography>


            {isLoading && <Loading />}
            {!isLoading && <ProductsList products={products as ProductWithId[]} />}
        </ShopLAyout>
    )
}

export default KidsPage
