import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories/>
      <BestSeller/>
      <BottomBanner/>
    </div>
  )
}

export default Home
