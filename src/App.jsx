import { createContext, useState, useLayoutEffect } from 'react'
import { Header } from './components/Header/Header';
import Details from './components/Details/Details';
import axios from 'axios';
import { GITHUB_USER_API } from './api/GitHub';
import Repositories from './components/Repositories/Repositories';
import './App.scss';

export const Context = createContext([() => { }]);

const App = () => {
  const [userData, setUserData] = useState({});

  useLayoutEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${GITHUB_USER_API}/github`);
        const data = await response.data;
        setUserData(data);
      } catch (e) {
        console.log(e);
      }
    })()
  }, []);

  return (
    <Context.Provider value={{ userData, setUserData }}>
      <Header />
      {Object.keys(userData).length > 0 &&
        <main className='MainContainer'>
          <Details />
          <Repositories />
        </main>}
    </Context.Provider>
  )
}

export default App;