import React, { useState } from 'react';
import Auth from "../utils/auth";

const DogEarForm = ({ ownerId, ISBN, addDogEarMutation }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log({
            userId: Auth.getProfile()._id,
            friendId: ownerId,
            ISBN,
            text
        });
        console.log(Auth.getProfile());

        await addDogEarMutation({
            variables: {
                userId: Auth.getProfile()._id, // This should be the logged-in user
                friendId: ownerId,  // This is the friend's ID passed as a prop
                ISBN,
                text
            }
        });
        console.log(addDogEarMutation)
    } catch (err) {
        console.error("Error executing mutation:", err);
    }
};



  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Add Dog Ear Note:
          <textarea value={text} onChange={e => setText(e.target.value)} required />
        </label>
      </div>
      <div>
        <button type="submit">Add Dog Ear</button>
      </div>
    </form>
  );
};

export default DogEarForm;
