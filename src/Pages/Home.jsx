import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR")
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setData(res)
            }).catch(err => console.log(err))
    }, [])

    return (
        <>
            <Heading>Crypto Coin Dashboard</Heading>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption >Crypto Data</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Coin</Th>
                            <Th>Price</Th>
                            <Th>24h Change</Th>
                            <Th>Market Cap</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((item, i) => (
                            <Tr key={item.id}>

                                <Td onClick={()=>navigate(`/coin/${item.id}`)}>
                                   
                                        <Flex gap={5}>
                                            <Image width="50px" src={item.image} />
                                            <Box>
                                                <Text fontWeight={"extrabold"} fontSize={"1rem"}>{item.symbol.toUpperCase()}</Text>
                                                <Text>{item.name}</Text>
                                            </Box>
                                        </Flex>
                                
                                </Td>

                                <Td>{item.current_price
                                }</Td>
                                <Td>{item.price_change_24h.toFixed(2)
                                }</Td>
                                <Td>{item.market_cap
                                }</Td>


                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Home