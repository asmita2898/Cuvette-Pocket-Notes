import React from 'react'
import styles from './MobileHome.module.css'
import background from "../../Assets/Background Image.png";

function MobileHome() {
  return (
    <div
      className={styles.mobile__home}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      Create Your First Note...
    </div>
  )
}

export default MobileHome
