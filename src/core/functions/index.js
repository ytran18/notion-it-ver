const getHoursAgo = (date) => {
    const now = new Date().getTime();
    const time = new Date(date).getTime()
    const diffInMs = Math.abs(now - time)
    let diff = Math.floor(diffInMs / (1000 * 60 * 60))
    if (diff < 1) return (`${Math.floor(diffInMs / 60000)}m ago`)
    else if (diff > 24) return (`${Math.floor(diff / 24)}d ago`)
    else return (`${diff}h ago`)
};

export { getHoursAgo };