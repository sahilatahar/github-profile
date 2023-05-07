import React, { useContext } from 'react';
import './Details.css';
import { Context } from '../App';

export default function Details() {

    const [userData, setUserData] = useContext(Context);
    return (
        <div className='Details'>
            <div className='top-section'>
                <img src={userData.avatar_url} alt="user_image" className='user-image' />
                <div className="right-section">
                    <h2><a href={userData.html_url} target='_blank' className='username'>{userData.login}</a></h2>
                    <h2>{userData.name}</h2>
                    <p><a href={`${userData.blog}`} target='_blank'>{userData.blog}</a></p>
                    <p>Member since : {getJoinTimeElapsed(userData.created_at)}</p>
                    <p>{userData.bio}</p>
                </div>
            </div>
            <div className="bottom-section">
                <a href='#Repositories'>{`${userData.public_repos} Repos`}</a>
                <a href='#Followers'>{`${userData.followers} Followers`}</a>
                <a href='#Following'>{`${userData.following} Followings`}</a>
            </div>
        </div>
    )
}

function getJoinTimeElapsed(joinTime) {
    const joinDate = new Date(joinTime);
    const currentDate = new Date();
    const elapsedMs = currentDate - joinDate;

    const minuteMs = 60 * 1000;
    const hourMs = 60 * minuteMs;
    const dayMs = 24 * hourMs;
    const monthMs = 30 * dayMs;
    const yearMs = 365 * dayMs;

    if (elapsedMs < minuteMs) {
        return 'just now';
    } else if (elapsedMs < hourMs) {
        const minutes = Math.floor(elapsedMs / minuteMs);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (elapsedMs < dayMs) {
        const hours = Math.floor(elapsedMs / hourMs);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (elapsedMs < monthMs) {
        const days = Math.floor(elapsedMs / dayMs);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (elapsedMs < yearMs) {
        const months = Math.floor(elapsedMs / monthMs);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(elapsedMs / yearMs);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}
