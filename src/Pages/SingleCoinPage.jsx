import { Box,Heading,Image, Text} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function getItem(id) {
    return fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(res => res.json())
}
function SingleCoinPage() {
    const [mydata, setMyData] = useState({})
    const params = useParams();
    console.log(params)
    useEffect(() => {
        getItem(params.id)
            .then((res) => {
                console.log(res);
                setMyData(res)
            })
    }, [])
    
    return (
        <Box>
          <Heading>{mydata.market_cap_rank}</Heading>
          <Image width="200px" src={mydata.image}/>
          <Text>{mydata.name}</Text>
          <Text>{mydata.symbol}</Text>
          <p>{mydata.current_price}</p>
          <Text>{mydata.price_change_24h}</Text>
          <Text>{mydata.total_volume}</Text>
          <Text>{mydata.high_24h}</Text>
          <Text>{mydata.low_24h}</Text>
          <Text>{mydata.total_supply
}</Text>
<Text>{mydata.max_supply}</Text>
<Text>{mydata.circulating_supply
}</Text>
<Text>{mydata.ath}</Text>
<Text>{mydata.last_updated
}</Text>
        </Box>
    )
}

export default SingleCoinPage