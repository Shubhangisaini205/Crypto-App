import React from 'react'
import { useParams } from 'react-router-dom'

function SingleCoinPage() {
    const params = useParams();
    console.log(params)
  return (
    <div>SingleCoinPage</div>
  )
}

export default SingleCoinPage