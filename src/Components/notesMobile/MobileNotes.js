import React from 'react'
import styles from './MobileNotes.module.css';
import { useNavigate } from 'react-router-dom';
import usePocketContext from '../../Hooks/usePocketContext';

function MobileNotes({title}) {

  const navigate = useNavigate();
  const { setSelected } = usePocketContext();

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
    localStorage.setItem("selected", title[0].name);
    setSelected(title[0].name);
    navigate("/notes");
  };

  return (
     <div onClick={handleTitleClick} className={styles.mobile__notes}>
      <div
        className={styles.mobile__notes__icon}
        style={{ backgroundColor: title[0].color }}
      >
        {firstInitial + lastInitial}
      </div>

      <div className={styles.mobile__notes__title}>{newTitle}</div>
      
    </div>
  )
}

export default MobileNotes
