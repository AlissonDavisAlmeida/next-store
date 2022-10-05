import { Typography } from '@mui/material'
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { ShopLAyout } from '../../components/layout'
import { ProductsList, ProductWithId } from '../../components/products'
import { Loading } from '../../components/ui/Loading'
import { getProductsByTerm } from '../../database/dbProducts'
import { useProducts } from '../../hooks'



const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ products }) => {


  console.log(products)

  return (
    <ShopLAyout
      title='Home Page'
      pageDescription='Home Page'
    >
      <Typography variant="h1" component={"h1"}>
        Search Product
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>ABC --- 123</Typography>


      {<ProductsList products={products as ProductWithId[]} />}
    </ShopLAyout>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

  const { query = "" } = context.params as { query: string }

  if (!query) return {
    redirect: {
      destination: "/",
      permanent: true
    }
  }

  let products = await getProductsByTerm(query)

  if (!products) {

  }

  return {
    props: {
      products
    }
  }

}


export default SearchPage
