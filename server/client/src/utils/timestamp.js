export function timeAgo(timestamp) {
    const currentTime = new Date();
    const createdTime = new Date(timestamp);
    const differenceInMs = currentTime - createdTime; // difference in milliseconds

    const seconds = Math.floor(differenceInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return `${weeks}w `;
    } else if (days > 0) {
        return `${days}d `;
    } else if (hours > 0) {
        return `${hours}hr`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
}

const timestamp = "2024-10-22T12:09:14.143Z";
console.log(timeAgo(timestamp));