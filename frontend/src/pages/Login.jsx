import { useState } from "react"
import Container from "../components/Container"
import { useAuthContext } from "../hooks/useAuthContext"
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [isError, setIsError] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      if (res.ok) {
        setCookie('token', data.token)
        dispatch({ type: 'LOGIN_USER', payload: { token: data.token, user: data.user } })
        setUser({
          email: '',
          password: '',
        })
        setIsError({})
        setIsError({ success: 'register with success' })
        navigate('/profile')
      } else {
        setIsError((prevData) => ({
          ...prevData,
          email: data.message.toLowerCase().includes('email') ? data.message.toLowerCase() : null,
          password: data.message.toLowerCase().includes('password') ? data.message.toLowerCase() : null,
        }))
      }
    } catch (error) {
      setIsError({ error: error.message })
    }

    setIsLoading(false)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md px-5 w-full flex flex-col gap-2 py-8">
        {isError?.success ? <span className="text-teal-500">{isError?.success}</span> : ''}
        <div>
          <label htmlFor="email"></label>
          <input
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent
                    ${isError?.email ? '!border-red-500' : ''}`}
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={user.email}
            autoComplete="email"
            onChange={handleChange}
          />
          {isError?.email ? <span className="text-red-500">{isError?.email}</span> : ''}
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent
                    ${isError?.password ? '!border-red-500' : ''}`}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={user.password}
            autoComplete="current-password"
            onChange={handleChange}
          />
          {isError?.password ? <span className="text-red-500">{isError?.password}</span> : ''}
        </div>

        <div className="flex justify-start gap-4">
          <button className="cursor-pointer dark:bg-zinc-800 bg-white rounded w-fit py-1.5 px-2 dark:hover:bg-zinc-700 hover:bg-zinc-300" type="submit">
            Login
            {
              isLoading
                ?
                <span className="is-loading"></span>
                :
                ''
            }
          </button>
        </div>
        {isError?.error ? <span className="text-red-500">{isError?.error}</span> : ''}
      </form>
    </Container>
  )
}

export default Login