<<<<<<< HEAD
import type { NextPage } from 'next'


const Home: NextPage = () => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
=======
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
>>>>>>> c2d10bd4e5d765190082ae9505a06d35757b6ba6
  )
}

export default Home
