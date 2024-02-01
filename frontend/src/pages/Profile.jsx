import Container from "../components/Container"
import { useAuthContext } from "../hooks/useAuthContext"

const Profile = () => {
    const { user } = useAuthContext()
    return (
        <Container className="py-20">
            <div>
                <p>Full Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <img src={user?.avatar} alt={user?.name} />
            </div>
        </Container>
    )
}

export default Profile