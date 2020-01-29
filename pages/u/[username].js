
import { useRouter } from 'next/router'


const userPage = () => {
    const router = useRouter();
    const { username } = router.query;

    return (
        <div>
            <h1>User Profile</h1>
            <hr/>
            <h2>Username: {username}</h2>
        </div>
    )
};

export default userPage;
