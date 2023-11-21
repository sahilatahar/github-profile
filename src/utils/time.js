function calculateTimeAgo(joinTime) {
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

export { calculateTimeAgo };