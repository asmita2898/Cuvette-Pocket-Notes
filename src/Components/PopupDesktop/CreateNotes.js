import React, { useEffect, useRef, useState } from 'react'
import './CreateNotes.css'

function CreateNotes({ groupNamesParent, setGroupNamesParent, onClose }) {

  const popupRef = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          // Click occurred outside the popup, close it
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      // Cleanup the event listener when the component unmounts
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);

    const [groupName, setGroupName] = useState("");
    const [bgColor, setBgColor] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleGroupName = (e) => {
      setGroupName(e.target.value);
      setErrorMessage('');
    };
  
    const handleColor = (e) => {
      const div = e.target;
      setBgColor(getComputedStyle(div).backgroundColor);
    };
  
    const saveName = () => {
      // Check if the group name already exists
    const isGroupNameExists = groupNamesParent.some((group) => group.name === groupName);

    if (isGroupNameExists) {
    setErrorMessage('Group name already exists. Please choose a different name.');
    } else {
      const newGroup = { name: groupName, color: bgColor };
      setGroupNamesParent([...groupNamesParent, newGroup]);
      localStorage.setItem('groupNames', JSON.stringify([...groupNamesParent, newGroup]));
      onClose();
    }
    };

  return (
    <div className="popup" ref={popupRef}>
      <div className="popup__title">Create New Group</div>
      <div className="popup__input">
        <span>Group Name</span>
        <input
          value={groupName}
          onChange={handleGroupName}
          type="text"
          placeholder="Enter Group Name..."
        />
      </div>

      {errorMessage && <div className="popup__error" style={{color:"red"}}>{errorMessage}</div>}

      <div className="popup__color__input">
        <span>Choose Color</span>
        <div className="popup__color__input__color">
          <div
            className={`color1 ${
              bgColor === "rgb(179, 139, 250)" ? `highlight` : null
            }`}
            onClick={handleColor}
          ></div>
          <div
            className={`color2 ${
              bgColor === "rgb(255, 121, 242)" ? `highlight` : null
            }`}
            onClick={handleColor}
          ></div>
          <div
            className={`color3 ${
              bgColor === "rgb(67, 230, 252)" ? `highlight` : null
            }`}
            onClick={handleColor}
          ></div>
          <div
            className={`color4 ${
              bgColor === "rgb(241, 149, 118)" ? `highlight` : null
            }`}
            onClick={handleColor}
          ></div>
          <div
            className={`color5 ${
              bgColor === "rgb(0, 71, 255)" ? `highlight` : null
            }`}
            onClick={handleColor}
          ></div>
          <div
            className={`color6 ${
              bgColor === "rgb(102, 145, 255)" ? `highlight` : null
            }`}
            onClick={handleColor}
          ></div>
        </div>
      </div>
      
      <div className="popup__close">
        <button onClick={saveName} disabled={groupName.length === 0}>
          Create
        </button>
      </div>
    </div>
  )
}

export default CreateNotes
