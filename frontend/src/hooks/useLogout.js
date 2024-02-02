import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
    const navigate = useNavigate()
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = async () => {
        // remove user data from localStorage
        localStorage.removeItem('user')

        // dispatch logout action
        await dispatch({ type: 'LOGOUT_USER', payload: null })
        await workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
        navigate('/')
    }

    return { logout }
}