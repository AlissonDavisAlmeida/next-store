import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLAyout } from '../components/layout'

const Home: NextPage = () => {
  return (
    <ShopLAyout
      title='Home'
      pageDescription='This is the home page'
      imageFullUrl='https://source.unsplash.com/random'
    >
      <Typography variant="h1" component={"h1"}>Store</Typography>
    </ShopLAyout>
  )
}

export default Home
