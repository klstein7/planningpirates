export const AVATAR_URLS = [
  "/images/avatars/1.png",
  "/images/avatars/2.png",
  "/images/avatars/3.png",
  "/images/avatars/4.png",
  "/images/avatars/5.png",
  "/images/avatars/6.png",
  "/images/avatars/7.png",
  "/images/avatars/8.png",
];

export const getRandomAvatarUrl = () => {
  return AVATAR_URLS[Math.floor(Math.random() * AVATAR_URLS.length)];
};
