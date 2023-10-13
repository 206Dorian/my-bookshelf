import React from 'react';
import {useQuery} from '@apollo/client';

import {GET_USER} from '../utils/queries';
import Bookshelf from '../components/Bookshelf';
import SearchBar from '../components/SearchBar';
import './Profile.css';
import Button from 'react-bootstrap/Button';
import OffcanvasComponent from '../components/OffCanvas';
import OffcanvasComponent2 from '../components/OffCanvas2';

const Profile = () => {
    const {loading: userLoading, error: userError, data: userData} = useQuery(GET_USER);

    const [showOffcanvas, setShowOffcanvas] = React.useState(false);
    const [showOffcanvas2, setShowOffcanvas2] = React.useState(false);

    const handleShowOffcanvas = () => setShowOffcanvas(true);
    const handleCloseOffcanvas = () => setShowOffcanvas(false);

    const handleShowOffcanvas2 = () => setShowOffcanvas2(true);
    const handleCloseOffcanvas2 = () => setShowOffcanvas2(false);

    if (userLoading) 
        return <p>Loading...</p>;
    
    if (userError) 
        return <p>User Error: {
            userError.message
        }</p>;
    

    const user = userData?.getUser;

    return (
        <div className='profile-cont'>
            <div className=''>     
                <div className='MyZone col-10 offset-1'>
                <br/>
                    <h3>Welcome, {
                        user.username
                    }!</h3>
                    <br/>
                    <div className='search'>
                    <SearchBar/>

    </div>
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

            {/* Offcanvas Component for showing trending books*/}
            <OffcanvasComponent show={showOffcanvas}
                handleClose={handleCloseOffcanvas}/>
                {/* Offcanvas Component to show friend features */}   
      <OffcanvasComponent2/>
      <Button variant="primary offcanvas-reveal-btn"
                onClick={handleShowOffcanvas2}>
                My Friends
            </Button>

            <OffcanvasComponent2 show={showOffcanvas2}
                handleClose={handleCloseOffcanvas2}/>
        </div>
    );
};

export default Profile;
