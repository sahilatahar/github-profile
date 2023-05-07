import React, { createContext, useState, useEffect } from 'react'
import { Search } from './Search/Search';
import Details from './Details/Details';
import { github } from './Data/GitHub'
import CreateList from './CreateList/CreateList';

export const Context = createContext([() => { }]);

const App = () => {

  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState('');
  const [isSuccessful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [pages, setPages] = useState([{ repos: 1, followers: 1, following: 1 }]);

  useEffect(() => {
    if (username === '') return;
    (async () => {
      try {
        setMessage('Please wait...')
        let respond = await github.get(`/${username}`);
        setUserData(respond.data);
        setPages({ repos: Math.floor(respond.data.public_repos / 30) + 1, followers: Math.floor(respond.data.followers / 30) + 1, following: Math.floor(respond.data.following / 30) + 1 });
        setSuccessful(true);
      } catch {
        setSuccessful(false);
        setMessage('User not found')
      }
    })();
  }, [username]);

  return (
    <Context.Provider value={[userData, setUserData]}>
      <Search setUsername={setUsername} />
      {
        isSuccessful ?
          <Details />
          : (username.length > 0 ? <h1 className='text-message'>{message}</h1> : null)
      }
      {isSuccessful ? <div className='full-details'>
        {/* Here i am sending index as props where 0 for repos , 1 for followers and 2 for following */}
        <CreateList index={0} username={username} pages={pages.repos} nextUrl={`/${username}/repos`} />
        <CreateList index={1} username={username} pages={pages.followers} nextUrl={`/${username}/followers`} />
        <CreateList index={2} username={username} pages={pages.following} nextUrl={`/${username}/following`} />
      </div> : null}
    </Context.Provider>
  )
}

export default App;