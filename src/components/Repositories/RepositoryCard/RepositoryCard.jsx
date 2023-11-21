import PropTypes from 'prop-types';
import './RepositoryCard.scss';
import licenseIcon from '../../../assets/license.svg';
import starIcon from '../../../assets/star.svg';
import forkIcon from '../../../assets/fork.svg';
import { calculateTimeAgo } from '../../../utils/time';

const RepositoryCard = ({ repoData }) => {
    const { name, description, html_url, stargazers_count, forks_count, license, updated_at } = repoData;

    const handleClick = () => {
        window.open(html_url, '_blank');
    }

    return (
        <section className='RepositoryCard' onClick={handleClick}>
            <h3 className='name'>{name}</h3>
            <p className='description'>{description}</p>
            <div className='RepositoryCard__footer'>
                {license?.spdx_id && <span><img src={licenseIcon} alt="" />{license?.spdx_id}</span>}
                <span><img src={forkIcon} alt="" />{forks_count}</span>
                <span><img src={starIcon} alt="" />{stargazers_count}</span>
                <span className='last__updated'>{calculateTimeAgo(updated_at)}</span>
            </div>
        </section>)
}

RepositoryCard.propTypes = {
    repoData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        html_url: PropTypes.string.isRequired,
        stargazers_count: PropTypes.number.isRequired,
        forks_count: PropTypes.number.isRequired,
        license: PropTypes.object,
        updated_at: PropTypes.string.isRequired
    })
}

export default RepositoryCard