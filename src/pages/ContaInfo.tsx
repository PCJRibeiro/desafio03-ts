import { Center, Spinner, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../components/AppContext"
import { api } from "../api"
import CardInfo from "../components/CardInfo"

interface UserData {
    email: string
    password: string
    name: string
    id: string
}
const ContaInfo = () => {

    const [userData, setUserData] = useState<null | UserData>()
    const { id } = useParams()
    const navigate = useNavigate()

    const { isLoggedIn } = useContext(AppContext)

    !isLoggedIn && navigate('/')

    useEffect(() => {
        const getData = async () => {
            const data: any | UserData = await api
            setUserData(data)
        }

        getData()
    }, [])

    // if (userData && id !== userData.id) {
    //     navigate('/')
    // }
    return (
        <>

            <Center><Text fontSize='3xl' fontWeight='bold' color='white'>
                Informações da conta
            </Text>
            </Center>
            {
                userData === undefined || userData === null ? (
                    <Center>
                        <Spinner size='xl' color='white' />
                    </Center>
                ) :
                    (
                        <Center>
                            <CardInfo mainContent={`${userData?.email}`} content={`${userData?.name}`} />
                        </Center>
                    )
            }

            <Center marginTop='40px'>
            <Link to='/conta/1'>
                <Text fontSize='xl' textDecoration='underline' color={"blue"}>
                    Conta
                </Text>
            </Link>
            </Center>
        </>
    )
}

export default ContaInfo
