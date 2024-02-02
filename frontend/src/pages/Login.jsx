import { useState } from "react"
import Container from "../components/Container"
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login, isLoading, error } = useLogin()
  const [user, setUser] = useState({ email: '', password: '', })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(user)

  }

  return (
    <Container>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md px-5 w-full flex flex-col gap-2 py-8">
        <div>
          <label htmlFor="email"></label>
          <input
            className={'w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent'}
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={user.email}
            autoComplete="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={user.password}
            autoComplete="current-password"
            onChange={handleChange}
          />
        </div>
        <div>
          {error ? <span className="text-red-500">{error}</span> : ''}
        </div>

        <div className="flex justify-start gap-4">
          <button disabled={isLoading} className="disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer dark:bg-zinc-800 bg-white rounded w-fit py-1.5 px-2 dark:hover:bg-zinc-700 hover:bg-zinc-300" type="submit">
            Login
            {isLoading ? <span className="is-loading"></span> : ''}
          </button>
        </div>
      </form>
    </Container>
  )
}

export default Login