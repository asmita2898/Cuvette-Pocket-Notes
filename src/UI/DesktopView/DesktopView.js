import React from 'react'
import styles from './DesktopView.module.css';
import DesktopSidebar from '../../Components/sidebarDesktop/DesktopSidebar';
import DesktopHome from '../../Components/homeDesktop/DesktopHome'
import DesktopNotes from '../../Components/notesDesktop/DesktopNotes';
import usePocketContext from '../../Hooks/usePocketContext';

function DesktopView() {
    const { selected } = usePocketContext();

  return (
     <div className={styles.desktop}>
      <DesktopSidebar />
      {selected.length > 0 ? <DesktopNotes /> : <DesktopHome />}
    </div>
  )
}

export default DesktopView
