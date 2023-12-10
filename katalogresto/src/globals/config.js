function buildCacheName() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
}

const Config = {
  BASE_URL: 'https://restaurant-api.dicoding.dev',
  CACHE_NAME: buildCacheName(),
  DATABASE_NAME: 'restaurant-app-db',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'favorite-restaurants',
};

export default Config;
