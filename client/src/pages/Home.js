import React from "react";
import Profile from "../pages/Profile";
import Login from "../components/Login";
import Auth from "../utils/auth";

const Home = () => {
    return (
        <main>
             <div className="">
                <div className="">
                    {Auth.loggedIn() ? (
                        <div>
                            <Profile
                            />
                        </div>
                    ) : (
                        <div>
                            <Login />
                        </div>
                    )}
                </div>
               
            </div>
        </main>
    );
};

export default Home;
