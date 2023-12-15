import React from 'react'
import styles from "./MobileNotesContent.module.css";

function MobileNotesContent({ note }) {
  return (
    <div className={styles.content__body}>
      <span className={styles.content__details}>
        <p>{note.content}</p>
      </span>
  

      <div className={styles.date__time__details}>
        <div className={styles.date}>{note.date}</div>
        <div className={styles.time}>{note.time}</div>
      </div>
    
  </div>
  )
}

export default MobileNotesContent
