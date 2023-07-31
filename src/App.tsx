import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import HomeLayout from './pages/home/layout/homeLayout';
import Register from './pages/home/auth/register';
import Login from './pages/home/auth/login';
import DefaultHome from './pages/home/layout/defaultHome';
import Ranks from './components/home/uikits/ranks';
import Explore from './components/home/uikits/explore';
import News from './components/home/uikits/news';
import Settings from './components/home/uikits/settings';
import Account from './components/home/uikits/account';
import NotFound from './components/home/notFound';

function App() {
  return (
      <Routes>
        <Route path='' element={<HomeLayout />}>
          <Route index={true} element={<DefaultHome />} />
          <Route path='/ranks' element={<Ranks />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/news' element={<News />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/account' element={<Account />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
  );
}

export default App;
