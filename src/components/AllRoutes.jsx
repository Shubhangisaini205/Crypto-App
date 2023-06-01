import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import SingleCoinPage from '../Pages/SingleCoinPage'

function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/coin/:id" element ={<SingleCoinPage/>}/>
    </Routes>
  )
}

export default AllRoutes