import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { UPDATE_AVATAR } from '../utils/mutations';
import AvatarOptions from './AvatarOptions';

function Avatar() {
  const { data, loading, error } = useQuery(GET_USER);
  const [updateAvatar, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_AVATAR);
  
  // Initializing the state with default values
  const [selectedAvatarOptions, setSelectedAvatarOptions] = useState({
    top: 'shortHair',
    accessoriesType: 'none',
    hairColor: 'brown',
    facialHairType: 'none',
    clotheType: 'shirtBlouse',
    eyeType: 'default',
    eyebrowType: 'default',
    mouthType: 'smile',
    skinColor: 'light'
  });

  const generateDiceBearURL = (seed, avatarOptions) => {
    const lowercaseOptions = Object.fromEntries(
      Object.entries(avatarOptions).map(([key, value]) => [key, String(value).toLowerCase()])
    );
  
    return `https://avatars.dicebear.com/api/avataaars/${seed}.svg?${new URLSearchParams(lowercaseOptions).toString()}`;
  };
  
  const handleUpdateAvatar = async () => {
    try {
      if (selectedAvatarOptions) {
        await updateAvatar({ variables: { username: data?.getUser?.username, avatarDetails: selectedAvatarOptions } });
        // Optionally, you can add logic here to refresh or navigate upon successful update
      } else {
        console.error("No avatar options selected!"); // For debugging
      }
    } catch (err) {
      console.error("Error updating avatar:", err);
    }
  };
  
  // Update the handler to work with the new data structure
  const handleAvatarChange = (newAvatarOptions) => {
    setSelectedAvatarOptions(newAvatarOptions);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const currentAvatarOptions = data?.getUser?.avatar;
  const currentDiceBearAvatar = generateDiceBearURL(data?.getUser?.username, currentAvatarOptions || {});

  return (
    <div>
      <img src={currentDiceBearAvatar} alt="Current Avatar" />
      <div>
        <h3>Select a new avatar:</h3>
        <AvatarOptions onAvatarChange={handleAvatarChange} />
      </div>
      <button onClick={handleUpdateAvatar} disabled={mutationLoading || !selectedAvatarOptions}>
        Update Avatar
      </button>
      {mutationError && <p>Error updating avatar: {mutationError.message}</p>}
    </div>
  );
}

export default Avatar;
