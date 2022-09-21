import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLAyout } from '../components/layout'
import { ProductsList, ProductWithId } from '../components/products'
import { initialData } from "../database/products"



const Home: NextPage = () => {



  return (
    <ShopLAyout
      title='Home Page'
      pageDescription='Home Page'
    >
      <Typography variant="h1" component={"h1"}>
        Store Page
      </Typography>

      <ProductsList products={initialData.products as ProductWithId[]} />
    </ShopLAyout>
  )
}

export default Home
