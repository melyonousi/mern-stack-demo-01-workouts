import { useState } from "react"
import Container from "../components/Container"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: ''
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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      if (res.ok) {
        setUser({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          avatar: ''
        })
        setIsError({})
        setIsError({ success: 'register with success' })
        setTimeout(() => {
          setIsLoading(false)
          navigate('/login')
        }, 1000)
      } else {
        setIsError((prevData) => ({
          ...prevData,
          name: data.message.toLowerCase().includes('name') ? data.message.toLowerCase() : null,
          email: data.message.toLowerCase().includes('email') ? data.message.toLowerCase() : null,
          password: data.message.toLowerCase().includes('password') ? data.message.toLowerCase() : null,
          confirmPassword: data.message.toLowerCase().includes('confirm') ? data.message.toLowerCase() : null,
        }))
        setIsLoading(false)
      }
    } catch (error) {
      setIsError({ error: error.message })
      setIsLoading(false)
    }

  }

  return (
    <Container>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md px-5 w-full flex flex-col gap-2 py-8">
        {isError?.success ? <span className="text-teal-500">{isError?.success}</span> : ''}
        <div>
          <label htmlFor="name"></label>
          <input
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent
                    ${isError?.name ? '!border-red-500' : ''}`}
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={user.name}
            autoComplete="name"
            onChange={handleChange}
          />
          {isError?.name ? <span className="text-red-500">{isError?.name}</span> : ''}
        </div>

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
            autoComplete="new-password"
            onChange={handleChange}
          />
          {isError?.password ? <span className="text-red-500">{isError?.password}</span> : ''}
        </div>

        <div>
          <label htmlFor="confirmPassword"></label>
          <input
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent
                    ${isError?.confirmPassword ? '!border-red-500' : ''}`}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirmPassword"
            value={user?.confirmPassword}
            autoComplete="new-password"
            onChange={handleChange}
          />
          {isError?.confirmPassword ? <span className="text-red-500">{isError?.confirmPassword}</span> : ''}
        </div>

        <div className="flex justify-start gap-4">
          <button className="cursor-pointer dark:bg-zinc-800 bg-white rounded w-fit py-1.5 px-2 dark:hover:bg-zinc-700 hover:bg-zinc-300" type="submit">
            Register
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

export default Register