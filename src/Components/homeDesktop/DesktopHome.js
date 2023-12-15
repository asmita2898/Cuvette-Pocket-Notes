import React from 'react'
import styles from './DesktopHome.module.css'
import background from "../../Assets/Background Image.png"
import lock from "../../Assets/lock.png"

function DesktopHome() {
  return (
    <div className={styles.desktop__home}>
      <img src={background} alt="home" />
      <h1>Pocket Notes</h1>
      <p>Send and receive messages without keeping your phone online.<br/>Use Pocket Notes on up to 4 linked Devices and 1 mobile phone.</p>
        <div className={styles.home__footer}>
          <img src={lock} alt="lock" />
          <span>end-to-end encrypted</span>
        </div>
    </div>
  )
}

export default DesktopHome
