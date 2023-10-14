import React from 'react';
import {Link} from 'react-router-dom';
import {GET_USER} from '../utils/queries';
import {useQuery} from '@apollo/client';
import Notifications from '../components/Notifications';
import SearchFriend from '../components/SearchFriend';
import './FriendList.css';


const FriendList = () => {

    const {loading: userLoading, error: userError, data: userData} = useQuery(GET_USER);
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
        <div className="col">
            <div className="col-6">
    {/*----------------FriendRequests------------*/}
                <div className="Notifications">
                    <Notifications/>
                </div>
            </div>
            <div className="col-6">
    {/*----------------Friends------------------ */}
                <div className="FriendZone">
                    <h4>My Friends:</h4>
                   
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
                    <div>
                        <h5>Add New Friend</h5>
                     <SearchFriend onUserSelected={handleUserSelected}/>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default FriendList;
