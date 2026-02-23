import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Skills from './pages/Skills/Skills'
import Header from './components/Header/Header'
import styles from './App.module.css'
function App() {


  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/skills' element={<Skills />} />


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
