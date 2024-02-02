import { useState } from "react"
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (user) => {

        setIsLoading(true)
        setError(null)

        const res = await fetch(process.env.REACT_APP_API_URL + '/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (res.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(data))
            // update use auth context
            dispatch({ type: 'LOGIN_USER', payload: data })

            navigate('/profile')

        } else {
            setError(data?.message)
        }
        setIsLoading(false)
    }
    return { login, isLoading, error }
}
