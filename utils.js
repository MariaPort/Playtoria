export const sleep = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

export const formatAppMagicLink = (link) => {
    const url = link.url;
    const regex = /\/([a-zA-Z0-9\-]+)\/[a-zA-Z0-9_\.]+$/;
    const name = url.match(regex)[1];
    const storeName = link.storeType == 'appstore' ? 'iphone' : 'google-play'; 

    return `https://appmagic.rocks/${storeName}/${name}/${link.appId}`;
}

export const formatSensorTowerLink = (link) => {
    const url = link.url;
    const regex = /app-profile\/([a-z]+)\/([a-z]+)\//;
    const country = url.match(regex)[2];

    return `https://app.sensortower.com/overview/${link.appId}?country=${country.toUpperCase()}`;
}
