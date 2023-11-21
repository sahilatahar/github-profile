import searchIcon from '../../assets/Search.svg';
import { useState, useRef, useCallback, useContext } from 'react';
import axios from 'axios';
import { GITHUB_USER_API } from '../../api/GitHub';
import { Context } from '../../App';
import './Header.scss';

export const Header = () => {

    const [user, setUser] = useState();
    const { setUserData } = useContext(Context);
    const timeout = useRef();
    const inputRef = useRef();

    const fetchUser = useCallback((username) => {
        const fetch = () => {
            clearTimeout(timeout.current);
            axios.get(`${GITHUB_USER_API}/${username}`).then(respond => {
                setUser(respond.data);
            }).catch(() => {
                setUser(null);
            });
        }
        clearTimeout(timeout.current);
        timeout.current = setTimeout(fetch, 500);
    }, []);

    const handleInput = () => {
        let username = inputRef.current.value;
        if (username === '') {
            setUser(null);
            return;
        }
        fetchUser(username);
    }

    const handleUser = () => {
        setUserData(user);
        setUser(null);
        inputRef.current.value = '';
    }

    return (
        <header className='Header'>
            <div className="search__div">
                <img src={searchIcon} alt="" />
                <input type="text" name="username" placeholder='username' onChange={handleInput} ref={inputRef} />
                {user &&
                    <div className="user" onClick={handleUser}>
                        <img src={user.avatar_url} alt="" />
                        <div className="user__info">
                            <h3 className='user__name'>{user.name}</h3>
                            <p className='user__bio'>{user.bio}</p>
                        </div>
                    </div>
                }
            </div>
        </header>
    )
}