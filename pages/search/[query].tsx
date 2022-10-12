import { Typography } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { ShopLAyout } from '../../components/layout'
import { ProductsList, ProductWithId } from '../../components/products'
import { Loading } from '../../components/ui/Loading'
import { getAllProducts, getProductsByTerm } from '../../database/dbProducts'
import { useProducts } from '../../hooks'

interface SearchPageProps {
  products: ProductWithId[]
  foundProducts: boolean
  query: string
}

const SearchPage: NextPage<SearchPageProps> = ({ products, foundProducts, query }) => {


  return (
    <ShopLAyout
      title='Home Page'
      pageDescription='Home Page'
    >
      {
        foundProducts && (<Typography variant="h1" component={"h1"} textTransform="capitalize">
          Search Product
        </Typography>)
      }

      {
        !foundProducts && (<Typography variant="h1" component={"h1"} textTransform="capitalize">
          No Products Found with terms: {query}
        </Typography>)
      }

      <Typography variant="h2" sx={{ mb: 1 }}>{query}</Typography>


      {<ProductsList products={products} />}
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
  let foundProducts = true
  let products = await getProductsByTerm(query)

  if (products.length === 0) {
    products = await getAllProducts()
    foundProducts = false
  }

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }

}


export default SearchPage
