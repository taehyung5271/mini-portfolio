import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Skills from './pages/Skills/Skills'
import Header from './components/Header/Header'
import styles from './App.module.css'
import Blog from './pages/Blog/Blog'
import BlogPost from './pages/BlogPost/BlogPost'
import Login from './pages/Login/Login'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { supabase } from './api/supabase'
import { setUser } from './store/authSlice'
import Problems from './pages/Problems/Problems'
import ProblemForm from './pages/ProblemForm/ProblemForm'
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(session?.user ?? null));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setUser(session?.user ?? null));
      }
    );

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path='/problems' element={<Problems />} />
          <Route path='/problems/new' element={<ProblemForm />} />
          <Route path='/problems/edit/:id' element={<ProblemForm />} />

          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
