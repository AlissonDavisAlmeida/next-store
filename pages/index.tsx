import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLAyout } from '../components/layout'
import { ProductsList, ProductWithId } from '../components/products'
import { Loading } from '../components/ui/Loading'
// import { initialData } from "../database/products"
import { useProducts } from '../hooks'



const Home: NextPage = () => {

  const { products, isError, isLoading } = useProducts("products")


  return (
    <ShopLAyout
      title='Home Page'
      pageDescription='Home Page'
    >
      <Typography variant="h1" component={"h1"}>
        Store Page
      </Typography>


      {isLoading && <Loading />}
      {!isLoading && <ProductsList products={products as ProductWithId[]} />}
    </ShopLAyout>
  )
}

export default Home
