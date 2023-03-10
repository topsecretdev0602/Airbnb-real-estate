import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Spots.css';
import { TiStar } from 'react-icons/ti';
import Footer from '../Footer/Footer';


export default function Spots() {
    const spots = useSelector((state) => {
        return Object.values(state.spots)
    })


    return (
        <>
            {spots.length > 1 &&
                <div className='main-content-parent-container'>
                    <div className='main-content-container'>
                        {spots.map((spot, idx) => (
                            <div key={idx} className='card-spot-container'>
                                <Link className='card-spot-link' to={`/spots/${spot.id}`}>
                                    <div className='card-spot-image-container'>
                                        <img className='card-spot-image' src={spot.Images[0]?.url} alt=''/>
                                    </div>
                                    <div className='card-spot-text-container'>
                                        <div className='card-spot-location'>{`${spot.city}, ${spot.state}`}</div>
                                        <div className='distance'>80 miles away</div>
                                        <div className='date'>Jan 22 - 27</div>
                                        <div className='price-container'>
                                            <span className='card-spot-price'>{`$${spot.pricePerNight}`} </span>
                                            <span className='night-word'>night</span>
                                        </div>
                                        <div className='star-rating'>
                                            <TiStar  />
                                            {spot.Reviews?.length ? (spot.Reviews.reduce((acc, review) => {
                                                return acc + review.stars
                                            }, 0) / spot.Reviews.length).toFixed(2) : 'new spot'}
                                            {/* {spot.numReviews > 0 ? spot.avgStarRating : 'new spot'} */}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>}
            <Footer />
        </>
    )
}
