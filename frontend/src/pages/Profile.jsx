import { useState } from "react"
import Container from "../components/Container"
import { useAuthContext } from "../hooks/useAuthContext"

const Profile = () => {
    const { user, dispatch } = useAuthContext()
    const [avatar, setAvatar] = useState(null)
    const [isLoading, setIsLoading] = useState()
    const [isError, setIsError] = useState()

    const handleChange = (e) => {
        setAvatar(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('avatar', avatar, user._id + '.' + avatar.name.split('.').pop());
            formData.append('_id', user._id);
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/upload`, {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            if (res.ok) {
                const _user = JSON.parse(localStorage.getItem('user'))
                user.avatar = data.avatar
                _user.user = user
                localStorage.setItem('user', JSON.stringify(_user))
                dispatch({ type: 'UPLOAD_USER', payload: _user })
                setIsError({})
                setIsError({ success: data.success })
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            } else {
                setIsError(data.message.toLowerCase().includes('avatar') ? data.message.toLowerCase() : null)
                setIsLoading(false)
            }
        } catch (error) {
            setIsError({ error: error.message })
            setIsLoading(false)
        }
    }

    return (
        <Container className="py-20">
            <div className="flex flex-col">
                <form onSubmit={handleSubmit} className="max-w-xs w-full min-h-60" encType="multipart/form-data">
                    <label className="w-full h-full" htmlFor="avatar">
                        <img src={process.env.REACT_APP_API_URL + '/uploads/' + user?.user?.avatar} alt={user?.user?.name} className="border max-w-xs w-full h-60 object-cover" />
                        <input
                            className={`hidden w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
                            type="file"
                            name="avatar"
                            id="avatar"
                            placeholder="avatar"
                            onChange={handleChange}
                        />
                    </label>
                    {isError?.error ? <span className="text-red-500">{isError?.error}</span> : ''}
                    <div className="flex justify-start gap-4">
                        {avatar && (
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
                        )}
                    </div>

                </form>
                <p>Full Name: {user?.user?.name}</p>
                <p>Email: {user?.user?.email}</p>

            </div>
        </Container>
    )
}

export default Profile