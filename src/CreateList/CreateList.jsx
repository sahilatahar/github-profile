import React, { useState, useEffect, useContext } from 'react';
import './CreateList.css';
import { github } from '../Data/GitHub';
import { Context } from '../App';

export default function CreateList({ index, username, pages, nextUrl }) {
    const headings = ['Repositories', 'Followers', 'Following'];
    const [pageNo, setPageNo] = useState(0);
    const [dataList, updateDataList] = useState([]);
    const [userData, setUserData] = useContext(Context);

    function loadMoreData() {
        setPageNo((pageNo) => pageNo + 1);
    }

    useEffect(() => {
        setPageNo(0);
    }, [username]);


    useEffect(() => {
        if (pageNo < 1) {
            updateDataList([]);
            setPageNo(pageNo + 1)
            return;
        }
        (async () => {
            try {
                let respond = await github.get(`${nextUrl}?page=${pageNo}`);
                updateDataList((list) => {
                    return [...list, ...respond.data];
                });
            } catch {
            }
        })();
    }, [pageNo])


    return (
        <div className='CreateList' id={headings[index]}>
            <h2>{`${index == 0 ? userData.public_repos : (index == 1 ? userData.followers : userData.following)} ${headings[index]}`}</h2>
            {dataList.length > 0 ?
                <ol className='ordered-list'>
                    {dataList.map((data) => {
                        return <li className='item' key={dataList.indexOf(data)}>
                            <a href={data.html_url} target='_blank'>{data.login != undefined ? data.login : data.name}</a>
                        </li>
                    })}
                </ol>
                :
                <p>{`No ${headings[index]}`}</p>
            } {pages > 1 && pageNo < pages ? <button className='load-more-btn' onClick={loadMoreData}>Load more...</button> : null}
        </div>
    )
}


