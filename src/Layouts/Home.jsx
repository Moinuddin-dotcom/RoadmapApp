import CreatePost from "../components/Pages/HomePages/CreatePost"
import useRole from "../Hooks/useRole"



const Home = () => {
    const [role,] = useRole()
    console.log(role)
    // if (isLoading) return <Loading />
    return (
        <div className="max-w-[80vw] mx-auto">
            {role === 'admin' && <div className="py-8">
                <CreatePost />
            </div>}
            <div className="border-4 border-black bg-amber-900 h-[50vh]">Buttom</div>
        </div>
    )
}

export default Home
