import React from 'react';
import {useQuery} from '@apollo/client';
import {Link} from 'react-router-dom';
import {GET_USER} from '../utils/queries';
import Bookshelf from '../components/Bookshelf';
import SearchFriend from '../components/SearchFriend';
import Notifications from '../components/Notifications';
import SearchBar from '../components/SearchBar';
import './Profile.css';
import Button from 'react-bootstrap/Button';
import OffcanvasComponent from '../components/OffCanvas';

const Profile = () => {
    const {loading: userLoading, error: userError, data: userData} = useQuery(GET_USER);

    const [showOffcanvas, setShowOffcanvas] = React.useState(false);

    const handleShowOffcanvas = () => setShowOffcanvas(true);
    const handleCloseOffcanvas = () => setShowOffcanvas(false);

    if (userLoading) 
        return <p>Loading...</p>;
    
    if (userError) 
        return <p>User Error: {
            userError.message
        }</p>;
    

    const user = userData?.getUser;

    const handleUserSelected = user => {
        console.log('Selected user:', user);
    };

    return (
        <div className='profile-cont'>
            <div className='row'>
                <div className='search'>
                    <SearchBar/>
                </div>
                <div className='MyZone col-4 offset-1'>
                    <h1>User Profile</h1>
                    <p>Username: {
                        user.username
                    }</p>
                </div>
                <div className='FriendZone col-4 offset-1'>
                    <Notifications/>
                    <h3>Friends:</h3>
                    <SearchFriend onUserSelected={handleUserSelected}/>
                    <ul style={
                        {
                            listStyleType: "none",
                            paddingLeft: "0"
                        }
                    }>
                        {/* Map through the friends array and create a link for each friend */}
                        {
                        user.friends.map((friend, index) => (
                            <li key={index}>
                                <Link to={
                                        `/friend/${
                                            friend.username
                                        }`
                                    }
                                    className="friend-name">
                                    {
                                    friend.username
                                } </Link>
                            </li>
                        ))
                    } </ul>
                </div>
            </div>

            <Bookshelf books={
                    user.bookshelf
                }
                ownerId={
                    user._id
                }/> {/* Button to trigger the Offcanvas */}
            <Button variant="primary offcanvas-reveal-btn"
                onClick={handleShowOffcanvas}>
                Show me what others are adding to their bookshelf...
            </Button>

            {/* Offcanvas Component */}
            <OffcanvasComponent show={showOffcanvas}
                handleClose={handleCloseOffcanvas}/>
        </div>
    );
};

export default Profile;
