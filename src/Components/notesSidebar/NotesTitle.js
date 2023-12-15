import React from 'react';
import './NotesTitle.css'
import usePocketContext from '../../Hooks/usePocketContext';

function NotesTitle({ title }) {

  const { selected, setSelected } = usePocketContext();

  const name = title[0].name;
  // Split the string into words
  const words = name.split(" ");
  // Get the initials of the first and last words
  const firstInitial = words.length > 0 ? words[0].charAt(0).toUpperCase() : '';
  const lastInitial = words.length > 1 ? words[words.length - 1].charAt(0).toUpperCase() : '';

  const newTitle = title[0].name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleTitleClick = () => {
    setSelected(title[0].name);
  };


  return (
    <div
      onClick={handleTitleClick}
      className={`group__title__logo ${selected === title[0].name ? "highlighted__title" : null
        }`}
    >
      <div className="title__logo" style={{ backgroundColor: title[0].color }}>
        {firstInitial + lastInitial}
      </div>

      <div className="group__title">{newTitle}</div>
      
    </div>
  )
}

export default NotesTitle
