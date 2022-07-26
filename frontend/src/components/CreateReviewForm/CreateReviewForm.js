
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from '../ReviewForm/ReviewForm';
import './CreateReviewForm.css';

export default function CreateReviewForm({ spotId, setRendered }) {
    const [ showModal, setShowModal ] = useState(false);


    const review = {
        spotId: spotId,
        review: '',
        starts: ''
    }

    const handleClose = () => {
        // setRendered(false)
        setShowModal(false)
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create Review</button>
            {showModal && <Modal onClose={handleClose}>
                <ReviewForm setShowModal={setShowModal} review={review} formType='Create Review' />
            </Modal>}

        </>
    )
}
