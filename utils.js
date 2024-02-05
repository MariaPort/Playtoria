const sleep = (milliseconds) => new Promise((resolve) => { setTimeout(resolve, milliseconds); });

const formatAppMagicLink = (link) => {
  const { url } = link;
  const regex = /\/([a-zA-Z0-9\-]+)\/[a-zA-Z0-9_\.]+$/;
  const name = url.match(regex)[1];
  const storeName = link.storeType === 'appstore' ? 'iphone' : 'google-play';

  return `https://appmagic.rocks/${storeName}/${name}/${link.appId}`;
};

const formatSensorTowerLink = (link) => {
  const { url } = link;
  const regex = /app-profile\/([a-z]+)\/([a-z]+)\//;
  const country = url.match(regex)[2];

  return `https://app.sensortower.com/overview/${link.appId}?country=${country.toUpperCase()}`;
};

module.exports = {
  sleep,
  formatAppMagicLink,
  formatSensorTowerLink,
};
