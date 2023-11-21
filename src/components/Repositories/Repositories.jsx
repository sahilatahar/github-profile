import { useContext, useState, useLayoutEffect } from "react";
import { Context } from "../../App";
import axios from "axios";
import RepositoryCard from "./RepositoryCard/RepositoryCard";
import './Repositories.scss';

function Repositories() {

    const { userData } = useContext(Context)
    const [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        setTotalPages(Math.round(userData.public_repos / 30 + 1));
        setCurrentPage(1);
        try {
            axios.get(`${userData.repos_url}?sort=updated`).then(respond => {
                setRepos(respond.data.slice(0, 4));
            });
        } catch (error) {
            console.log(error)
        }
    }, [userData])

    const handleLoadMore = async () => {
        try {
            setLoading(true);
            const respond = await axios.get(`${userData.repos_url}?sort=updated&page=${currentPage}`);
            setRepos([...repos, ...respond.data]);
            setCurrentPage(pre => pre + 1);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="Repositories">
            {repos && repos.map((repo, index) => <RepositoryCard repoData={repo} key={index} />)}
            {currentPage < totalPages && <button onClick={handleLoadMore}>{loading ? 'Loading...' : 'View More'}</button>}
        </div>
    )
}

export default Repositories