import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NotesMobilePage.module.css';
import disable from "../../Assets/Disable Arrow.png";
import enable from "../../Assets/Enable Arrow.png"
import back from "../../Assets/Back.png";
import background from "../../Assets/Background Image.png";
import MobileNotesContent from '../notesContentMobile/MobileNotesContent';
import usePocketContext from '../../Hooks/usePocketContext';

function NotesMobilePage() {

  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [initials, setInitials] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const { notes, setNotes, selected, setSelected } = usePocketContext();

  useEffect(() => {
    setSelected(localStorage.getItem("selected") || "");
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
  }, [setSelected, setNotes, selected]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveNotes();
      setText("");
    }
  };

  const handleSaveNotes = (e) => {
    const notes = JSON.parse(localStorage.getItem(selected)) || [];
    const newNoteObj = {
      id: Date.now(),
      title: selected,
      content: text,
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
    if (e.target.value !== '') {
      setIsTyping(true);
    }
    else {
      setIsTyping(false)
    }
    setText(e.target.value);
  };

  const goBack = () => {
    setSelected("");
    navigate("/");
  };

  return (
    <div className={styles.mobiles__notes__page}>
      <div className={styles.mobile__notes__content__title}>
        <img src={back} alt="back" onClick={goBack} />
        <div
          className={styles.mobile__notes__content__title__color}
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>

        <div className={styles.mobile__notes__content__title__text}>
          {selectedTitle}
        </div>

      </div>

      <div className={styles.mobile__notes__page__body}>
        {notes.length === 0 ? (
          <div
            className={styles.mobile__notes__page__body__empty}
            style={{ backgroundImage: `url(${background})` }}
          ></div>
        ) : (
          <div>
            {notes.map((note, index) => (
              <MobileNotesContent key={index} note={note} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.mobile__notes__input}>
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

export default NotesMobilePage
