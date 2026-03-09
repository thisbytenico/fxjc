import dayjs from 'dayjs';

export function getShortenAddress(address) {
    if (!address) return '';
    const firstCharacters = address.substring(0, 6);
    const lastCharacters = address.substring(address.length - 4, address.length);
    return `${firstCharacters}...${lastCharacters}`;
}

export function formatDay(time, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs.unix(time).format(format);
}
