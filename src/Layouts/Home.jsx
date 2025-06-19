import AllPost from "../components/Pages/HomePages/AllPost"
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
            <div className="">
                <AllPost />
            </div>
        </div>
    )
}

export default Home
