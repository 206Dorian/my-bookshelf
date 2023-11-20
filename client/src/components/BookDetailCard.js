import React, {useState} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import {useMutation} from '@apollo/client';
import {ADD_TO_BOOKSHELF, ADD_DOG_EAR} from '../utils/mutations';
import UpdateScribbles from './UpdateScribbles';
import Auth from '../utils/auth';
import './BookDetailCard.css';

const BookDetailCard = ({
    bookDetails,
    onClose,
    ownerId,
    showDogEar = true
}) => {
    const [addToBookshelf] = useMutation(ADD_TO_BOOKSHELF);
    const [addDogEar] = useMutation(ADD_DOG_EAR);
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    const loggedInUserId = Auth.getProfile()._id;
 
    const firstSentence = Array.isArray(bookDetails.firstSentence) ? bookDetails.firstSentence[0] : bookDetails.firstSentence;

    const hasExistingDogEar = bookDetails.dogEars ? bookDetails.dogEars.some(dogEar => dogEar.createdBy === loggedInUserId) : false;

    const handleAddToBookshelf = async (e) => {
        e.stopPropagation();
      
        try {
          if (!bookDetails.ISBN) {
            throw new Error('ISBN not available for the selected book.');
          }
      
          const cleanBookDetails = {
            title: bookDetails.title || 'Unknown Title',
            author: bookDetails.author || 'Unknown Author',
            ISBN: bookDetails.ISBN || 'Unknown ISBN',
            firstSentence: bookDetails.firstSentence || 'First sentence not available',
          };
      
          console.log(cleanBookDetails);
      
          await addToBookshelf({
            variables: {
              ISBN: bookDetails.ISBN,  // Use bookInfo.ISBN consistently
              bookDetails: cleanBookDetails,
            },
          });
      
          window.location.reload();
          setMessage('Book added to the bookshelf successfully!');
          onClose();
        } catch (error) {
          console.error(error);
          setMessage(error.message);
        }
      };

    const handleDogEarSubmit = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            await addDogEar({
                variables: {
                    userId: loggedInUserId,
                    friendId: ownerId,
                    ISBN: bookDetails.ISBN,
                    text
                }
            });
            setText('');
        } catch (err) {
            console.error(err);
        }
    };

    const isOwner = loggedInUserId === ownerId;
    console.log('BookDetails: ', bookDetails)

    return (
        <Modal show={true}
            onHide={onClose}
            centered
            dialogClassName="custom-modal-width">
            <Modal.Header closeButton>
            {/* <Modal.Title>{bookInfo.title}</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <Row> {/* Left Page: Details and Scribbles */}
                    <Col md={6}
                        id='left-page'>
                        <div className="details">
                            <p>{
                                bookDetails.title || 'Unknown Title'
                            }</p>
                            <p>{
                                bookDetails.author || 'Unknown Author'
                            }</p>
                            <p>ISBN: {
                                bookDetails.ISBN || 'Unknown ISBN'
                            }</p>
                            <p>{
                                firstSentence || 'First sentence not available'
                            }</p>
                            {
                            message && <p>{message}</p>
                        } </div>
                        <div className='scribbles'>
                            <p>{
                                bookDetails.scribbles
                            }</p>
                            {
                            isOwner && <UpdateScribbles userId={ownerId}
                                ISBN={
                                    bookDetails.ISBN
                                }/>
                        } </div>
                        <button onClick={handleAddToBookshelf}>Add to Bookshelf</button>
                    </Col>

                    {/* Right Page: Notes, Dog Ears, and Form */}
                    <Col md={6}
                        id='right-page'>
                        <div className="notes">
                            {
                            bookDetails.notes?.map((note, index) => (
                                <div key={index}>
                                    <span>{
                                        note.key
                                    }:</span>
                                    {
                                    note.value
                                } </div>
                            ))
                        } </div>
                        {
                        bookDetails.dogEars && bookDetails.dogEars.length > 0 && (
                            <div className="dogEars">
                                <p>Dog Ear Notes:</p>
                                <ul> {
                                    bookDetails.dogEars.map((dogEar, index) => (
                                        <li key={index}>
                                            {
                                            dogEar.text
                                        }</li>
                                    ))
                                } </ul>
                            </div>
                        )
                    }
                        {
                        ! hasExistingDogEar && (
                            <div className={
                                `dogear-form m-4 p-4 ${
                                    showDogEar ? '' : 'hidden'
                                }`
                            }>
                                <form onSubmit={handleDogEarSubmit}>
                                    <div>
                                        <label>
                                            Add Dog Ear Note:
                                            <textarea value={text}
                                                onChange={
                                                    (e) => setText(e.target.value)
                                                }
                                                required/>
                                        </label>
                                    </div>
                                    <div>
                                        <button type="submit">Add Dog Ear</button>
                                    </div>
                                </form>
                            </div>
                        )
                    } </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};


export default BookDetailCard;
