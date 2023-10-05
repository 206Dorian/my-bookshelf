import React from 'react';
import Auth from "../utils/auth";

const LogoutButton = () => {
  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
