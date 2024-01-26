import { NavLink } from "react-router-dom"
import Container from "./Container"

const NavBar = () => {
    return (
        <Container className="bg-zinc-900 sticky top-0">
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
                </ul>
            </nav>
        </Container>
    )
}

export default NavBar