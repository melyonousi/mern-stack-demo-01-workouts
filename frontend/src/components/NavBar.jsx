import { NavLink } from "react-router-dom"
import Container from "./Container"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"

const NavBar = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    return (
        <Container className="dark:bg-zinc-900 bg-zinc-100 sticky top-0 z-50">
            <nav className="flex justify-between items-center gap-4
                *:flex *:items-center *:gap-2">
                <ul className="font-bold">
                    <li className="*:py-3 *:flex"><NavLink to={'/'}>Mern Stack</NavLink></li>
                </ul>
                <ul className="font-bold">
                    <li className="*:border-b-4 *:border-b-transparent *:py-3 *:flex *:transition-all *:duration-700 *:ease-in-out">
                        <NavLink
                            className={({ isActive }) => isActive ? '!border-b-teal-500' : ''}
                            to={'/'}>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className="*:border-b-4 *:border-b-transparent *:py-3 *:flex *:transition-all *:duration-700 *:ease-in-out">
                        <NavLink
                            className={({ isActive }) => isActive ? '!border-b-teal-500' : ''}
                            to={'/workouts'}>
                            <span>Workouts</span>
                        </NavLink>
                    </li>
                    <li className="*:border-b-4 *:border-b-transparent *:py-3 *:flex *:transition-all *:duration-700 *:ease-in-out">
                        <NavLink
                            className={({ isActive }) => isActive ? '!border-b-teal-500' : ''}
                            to={'/about'}>
                            <span>About</span>
                        </NavLink>
                    </li>
                    {
                        user ? (
                            <>
                                <li className="*:border-b-4 *:border-b-transparent *:py-3
                                    *:rounded-full *:text-white *:bg-teal-500
                                    *:flex *:transition-all *:duration-700 *:ease-in-out">
                                    <NavLink
                                        className={({ isActive }) => isActive ? '!border-b-teal-500' : ''}
                                        to={'/profile'}>
                                        <span className="">{user?.user?.name.substring(0, 2).toUpperCase()}</span>
                                    </NavLink>
                                </li>
                                <li className="*:border-b-4 *:border-b-transparent *:py-3 *:flex *:transition-all *:duration-700 *:ease-in-out">
                                    <button onClick={() => logout()}>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="*:border-b-4 *:border-b-transparent *:py-3 *:flex *:transition-all *:duration-700 *:ease-in-out">
                                    <NavLink
                                        className={({ isActive }) => isActive ? '!border-b-teal-500' : ''}
                                        to={'/login'}>
                                        <span>Login</span>
                                    </NavLink>
                                </li>
                                <li className="*:border-b-4 *:border-b-transparent *:py-3 *:flex *:transition-all *:duration-700 *:ease-in-out">
                                    <NavLink
                                        className={({ isActive }) => isActive ? '!border-b-teal-500' : ''}
                                        to={'/register'}>
                                        <span>Register</span>
                                    </NavLink>
                                </li>
                            </>
                        )
                    }

                </ul>
            </nav>
        </Container>
    )
}

export default NavBar