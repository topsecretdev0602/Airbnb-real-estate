import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpotsThunk } from '../../store/spots';
import { Link } from 'react-router-dom';
import './Spots.css';



export default function Spots() {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllSpotsThunk());

    }, [dispatch])

    const spots = useSelector((state) => {
        return Object.values(state.spots)
    })

    // const reviews = spots.Reviews.reduce((acc, review) => {
    //     return acc.stars + review.stars
    // })

    // console.log('SUM', reviews)

    return (
        <div className='main'>
            <div className='main-content-parent-container'>
                <div className='main-content-container'>
                    {spots.map((spot, idx) => (
                        <div key={idx} className='card-spot-container'>
                            <Link className='card-spot-link' to={`/spots/${spot.id}`}>
                                <img className='card-spot-image' style={{width: 289, height: 275}} src={spot.previewImage}/>
                                <div className='card-spot-text-container'>
                                    <div className='card-spot-location'>{`${spot.city}, ${spot.state}`}</div>
                                    <div className='distance'>80 miles away</div>
                                    <div className='date'>Jan 22 - 27</div>
                                    <div className='price-container'>
                                        <span className='card-spot-price'>{`$${spot.pricePerNight}`} </span>
                                        <span className='night-word'>night</span>
                                    </div>
                                    <div className='star-rating'>

                                        {spot.Reviews.length ? (spot.Reviews.reduce((acc, review) => {
                                            return acc + review.stars
                                        }, 0) / spot.Reviews.length).toFixed(2) : 'new spot'}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
