import { Box, Button, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure } from '@chakra-ui/react'
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
    const [query, setquery] = useState("")
    const [sigleData, setSignleData] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [category, setCategory] = useState("INR")
    const [order, setOrder] = useState("market_cap_desc")
    const [page, setPage] = useState(1)
    // console.log(order,page)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en
    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${category}&order=${order}&per_page=10&page=${page}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setData(res)
            }).catch(err => console.log(err))

    }, [page, order, category])
    ///api/v3/search?query=bitcoin

    const handleModel = (id) => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then((res) => res.json())
            .then(res => {
                console.log(res)
                setSignleData(res)
            })
        isOpen
    }
    if (sigleData.image != undefined) {
        var { small } = sigleData.image
        console.log(small)
    }
    return (
        <>
            <Select width="200px" onClick={(e) => setOrder(e.target.value)}>
                <option value="market_cap_asc">Low to high</option>
                <option value="market_cap_desc">High to Low</option>
            </Select>
            <Select width="200px" onClick={(e) => setCategory(e.target.value)}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </Select>

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
                            <>
                                <Tr onClick={() => handleModel(item.id)}  >
                                    <Td onClick={onOpen}>

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
                                    <Td>{item.price_change_24th !== 0 ? item.price_change_24h.toFixed(2) : item.price_change_24h
                                    }</Td>
                                    {/* <Td>{item.price_change_24h}</Td> */}
                                    <Td>{item.market_cap
                                    }</Td>

                                </Tr>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Details of the Coin </ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Heading>{sigleData.name}</Heading>
                                            <Heading>Market Cap Rank: {sigleData.market_cap_rank}</Heading>
                                            <Image width="50px" src={small} />
                                            <Text>Name: {sigleData.name}</Text>
                                            <Text>Symbol:{sigleData.symbol}</Text>
                                            <Text>Last updated:{sigleData.last_updated
                                            }</Text>
                                            <Text>Price Change 24hour: {sigleData.price_change_24h
                                            }</Text>
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button colorScheme='teal' mr={3} onClick={onClose}>
                                                Close
                                            </Button>

                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </>

                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <Button isDisabled={page == 1} onClick={() => setPage(page - 1)}>Prev</Button>
            <Button>{page}</Button>
            <Button onClick={() => setPage(page + 1)}>Next</Button>
        </>
    )
}

export default Home