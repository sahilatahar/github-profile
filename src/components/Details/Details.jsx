import { useContext } from 'react';
import './Details.scss';
import { Context } from '../../App';
import { calculateTimeAgo } from '../../utils/time';

export default function Details() {
    const { userData } = useContext(Context);

    return (
        <div className='Details'>
            <div className='top-section'>
                <img src={userData.avatar_url} alt="image" className='user-image' />
                <span className="right-section">
                    <button><span>Followers</span> <span>{userData.followers}</span></button>
                    <button><span>Following</span> <span>{userData.following}</span></button>
                    <button><span>Location</span><span>{userData.location}</span></button>
                </span>
            </div>
            <div className="bottom-section">
                <h2 className='name'><a href={userData.html_url} target='_blank' rel='noreferrer'>{userData.name}</a></h2>
                <p className='bio'>{userData.bio}</p>
                <a className='external-link' href={userData.blog} target='_blank' rel='noreferrer'>{userData.blog}</a>
                <p>Member since : {calculateTimeAgo(userData.created_at)}</p>
            </div>
        </div>
    )
}