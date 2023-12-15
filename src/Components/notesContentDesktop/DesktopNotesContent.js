import React from 'react'
import styles from "./DesktopNotesContent.module.css";

function DesktopNotesContent({ note }) {
  return (
    <div className={styles.notes_content}>

      <span className={styles.notes}>
          <p>{note.content}</p>
      </span>

      <div className={styles.date_time}>
          <div className={styles.desktop__notes__content__date}>{note.date} .</div>
          <div className={styles.desktop__notes__content__time}>{note.time}</div>
      </div>
      
    </div>
  )
}

export default DesktopNotesContent
