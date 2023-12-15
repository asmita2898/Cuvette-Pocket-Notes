import React, { useEffect, useState } from 'react'
import styles from './DesktopNotes.module.css';
import disable from "../../Assets/Disable Arrow.png";
import enable from "../../Assets/Enable Arrow.png"
import DesktopNotesContent from '../notesContentDesktop/DesktopNotesContent'
import usePocketContext from '../../Hooks/usePocketContext';


function DesktopNotes() {

    const [text, setText] = useState("");
    const [bgColor, setBgColor] = useState("#fff");
    const [initials, setInitials] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const { notes, setNotes, selected } = usePocketContext();
    const[isTyping, setIsTyping] = useState(false);
  
    useEffect(() => {
      setNotes(JSON.parse(localStorage.getItem(selected)) || []);
      const groupNames = JSON.parse(localStorage.getItem("groupNames"));
      const selectedGroup = groupNames.find((group) => group.name === selected);
      if (selectedGroup) {
      setBgColor(selectedGroup.color);

    // Extracting initials of the first and last words
    const nameWords = selectedGroup.name.split(" ");
    const firstInitial = nameWords[0].charAt(0).toUpperCase();
    const lastInitial = nameWords.length > 1 ? nameWords[nameWords.length - 1].charAt(0).toUpperCase() : '';
    // Setting initials
    setInitials(`${firstInitial}${lastInitial}`);
        
        setSelectedTitle(
          selectedGroup.name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        );
      }
    }, [selected, setNotes]);
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSaveNotes();
      }
    };
  
    const handleSaveNotes = () => {
      if (!text.trim()) {
        return;
      }
      const notes = JSON.parse(localStorage.getItem(selected)) || [];
      const newNoteObj = {
        id: Date.now(),
        title: selected,
        content: text.trim(),
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString(),
      };
      notes.push(newNoteObj);
      localStorage.setItem(selected, JSON.stringify(notes));
      setText("");
      setNotes(notes);
    };
  
    const handleChange = (e) => {
      if(e.target.value !== ''){
        setIsTyping(true);
      }
      else{
        setIsTyping(false)
      }
      setText(e.target.value);
    };
  
  return (
    <div className={styles.desktop__notes}>
      <div className={styles.desktop__notes__title}>
        <div
          className={styles.desktop__notes__title__color}
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>

        <div className={styles.desktop__notes__title__text}>{selectedTitle}</div>

      </div>

      <div className={styles.desktop__notes__content}>
        {notes && notes.length > 0
          ? notes.map((note, index) => (
              <DesktopNotesContent key={index} note={note} />
            ))
          : null}
      </div>
      
      <div className={styles.desktop__notes__input}>
        <textarea
          value={text}
          placeholder="Enter your text here ........"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>

        {isTyping ? (
          <img src={enable} alt="enter" onClick={handleSaveNotes} />
        ) : (
          <img src={disable} alt="enter" />
        )}
        
      </div>
    </div>
  )
}

export default DesktopNotes
