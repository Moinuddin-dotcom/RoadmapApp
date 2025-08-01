import loadingIcon from '../../../src/assets/loading/undraw_to-do_06xe.svg';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <img src={loadingIcon} alt="Loading..." className="w-96 " />
        </div>
    )
}

export default Loading
