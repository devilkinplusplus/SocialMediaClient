function timeFormat(date: string): string {
    const now: Date = new Date();
    const utcDate = new Date(date);
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
    const timeElapsedInSeconds: number = (now.getTime() - new Date(localDate).getTime()) / 1000;
  
    if (timeElapsedInSeconds < 60) {
        return `${Math.floor(timeElapsedInSeconds)} seconds ago`;
    } else if (timeElapsedInSeconds < 3600) {
        const minutes: number = Math.floor(timeElapsedInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeElapsedInSeconds < 86400) {
        const hours: number = Math.floor(timeElapsedInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (timeElapsedInSeconds < 2592000) {
        const days: number = Math.floor(timeElapsedInSeconds / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (timeElapsedInSeconds < 31536000) {
        const months: number = Math.floor(timeElapsedInSeconds / 2592000);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        const years: number = Math.floor(timeElapsedInSeconds / 31536000);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
}

export { timeFormat };
