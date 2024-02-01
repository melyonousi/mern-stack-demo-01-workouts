import { NavLink } from "react-router-dom"
import Container from "./Container"
import { useAuthContext } from "../hooks/useAuthContext"

const NavBar = () => {
    const { user } = useAuthContext()
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
                            <li className="*:border-b-4 *:border-b-transparent *:py-3 *:flex *:transition-all *:duration-700 *:ease-in-out">
                                <NavLink
                                    className={({ isActive }) => isActive ? '!border-b-teal-500' : ''}
                                    to={'/profile'}>
                                    <span>{user?.name}</span>
                                </NavLink>
                            </li>
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