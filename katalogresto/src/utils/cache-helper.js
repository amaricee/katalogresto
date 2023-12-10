import Config from '../globals/config';

const { CACHE_NAME } = Config;

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this.openCache();
    await cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((name) => name !== CACHE_NAME)
        .map((filteredName) => caches.delete(filteredName)),
    );
  },

  async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      return response;
    }

    const fetchedResponse = await this.fetchRequest(request);

    return fetchedResponse;
  },

  async openCache() {
    return caches.open(CACHE_NAME);
  },

  async fetchRequest(request) {
    try {
      const response = await fetch(request);

      if (!response || response.status !== 200) {
        return response;
      }

      await this.addCache(request, response.clone());

      return response;
    } catch (error) {
      console.error('Error fetching:', error);
      throw error;
    }
  },

  async addCache(request, response) {
    const cache = await this.openCache();
    await cache.put(request, response);
  },
};

export default CacheHelper;
