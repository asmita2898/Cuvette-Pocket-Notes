import './App.css'
import DesktopView from './UI/DesktopView/DesktopView'
import MobileView from './UI/MobileView/MobileView'
import NotesMobilePage from './Components/notesMobilePage/NotesMobilePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from './Context/PocketContext'
import usePocketContext from './Hooks/usePocketContext'
import { useEffect, useState } from 'react'

function App() {

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { selected, setSelected } = usePocketContext();

  useEffect(() => {
    setSelected(localStorage.getItem("selected") || "");
    // eslint-disable-next-line
  }, [selected]);
  
  const checkScreenSize = () => {
    setScreenSize(window.innerWidth);
  };

  window.addEventListener("resize", checkScreenSize);

  return (
    <Provider>
      <div className="App">
        {screenSize > 500 ? (
          <DesktopView />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<MobileView />} />
              <Route path="/notes" element={<NotesMobilePage />} />
            </Routes>
          </Router>
        )}
      </div>
    </Provider>
  )
}

export default App

