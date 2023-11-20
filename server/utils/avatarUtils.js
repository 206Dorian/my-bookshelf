const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); // Cache for 1 hour

function getAvatarUrl(username) {
  const cachedAvatar = cache.get(username);

  if (cachedAvatar) {
    return cachedAvatar;
  }

  const avatarUrl = `https://avatars.dicebear.com/api/avataaars/${username}.svg`;
  cache.set(username, avatarUrl);

  return avatarUrl;
}

module.exports = {
  getAvatarUrl
};
