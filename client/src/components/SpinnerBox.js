import { ProgressBar } from 'react-loader-spinner'

function SpinnerBox(props) {

    return (
        <>
            <h2 className='spinner-label'>Loading...</h2>
            <ProgressBar
                height="65"
                width="65"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='#F4442E'
                barColor='#51E5FF'
            />
        </>
    );
}

export default SpinnerBox;