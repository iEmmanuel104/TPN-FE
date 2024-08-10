import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../state/store'
import { useGetLoggedInUserInfoQuery } from '../../api/userApi'
import { setUser } from '../../state/slices/authSlice'
import Spinner from '../Spinner'

export const AuthenticatedRoute = ({ component }: { component: ReactNode }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { loggedUser } = useSelector((state: RootState) => state.auth)
    const { isError: getUserIsError, currentData } = useGetLoggedInUserInfoQuery(null)

    useEffect(() => {
        if (!currentData && getUserIsError) {
            navigate('/login')
        }
    }, [getUserIsError, currentData, dispatch, navigate])

    if (currentData && !loggedUser) {
        dispatch(setUser(currentData.data.user))
    }

    return (
        <>
            {
                !currentData && !getUserIsError
                    ? (
                        <>
                            <Spinner width='50px' height='50px' />
                        </>
                    )
                    : <>
                        {component}
                    </>
            }

        </>
    )
}
