import React, { useState } from 'react';

const AvatarOptions = ({ onAvatarChange }) => {
    const [options, setOptions] = useState({
   
        accessoriesType: 'none',
        hairColor: 'brown',
        facialHairType: 'none',
        clotheType: 'shirtBlouse',
        eyeType: 'default',
        eyebrowType: 'default',
        mouthType: 'smile',
        skinColor: 'light'
    });

    const handleChange = (e) => {
        setOptions(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div>
            <select name="top" value={options.top} onChange={handleChange}>
                <option value="shortHair">Short Hair</option>
                <option value="longHair">Long Hair</option>
                <option value="hat">Hat</option>
                {/* ... add more options based on DiceBear's API */}
            </select>
            
            <select name="accessoriesType" value={options.accessoriesType} onChange={handleChange}>
                <option value="none">No Accessories</option>
                <option value="glasses">Glasses</option>
                {/* ... other options */}
            </select>

            <select name="hairColor" value={options.hairColor} onChange={handleChange}>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
                <option value="blonde">Blonde</option>
                {/* ... other colors */}
            </select>

            <select name="facialHairType" value={options.facialHairType} onChange={handleChange}>
                <option value="none">None</option>
                <option value="beard">Beard</option>
                {/* ... other types */}
            </select>

            <select name="clotheType" value={options.clotheType} onChange={handleChange}>
                <option value="shirtBlouse">Shirt/Blouse</option>
                <option value="tShirt">T-Shirt</option>
                {/* ... other types */}
            </select>

            <select name="eyeType" value={options.eyeType} onChange={handleChange}>
                <option value="default">Default</option>
                <option value="happy">Happy</option>
                {/* ... other types */}
            </select>

            <select name="eyebrowType" value={options.eyebrowType} onChange={handleChange}>
                <option value="default">Default</option>
                <option value="raised">Raised</option>
                {/* ... other types */}
            </select>

            <select name="mouthType" value={options.mouthType} onChange={handleChange}>
                <option value="smile">Smile</option>
                <option value="frown">Frown</option>
                {/* ... other types */}
            </select>

            <select name="skinColor" value={options.skinColor} onChange={handleChange}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="tan">Tan</option>
                {/* ... other colors */}
            </select>

            <button onClick={() => onAvatarChange(options)}>Preview Avatar</button>
        </div>
    );
};

export default AvatarOptions;
