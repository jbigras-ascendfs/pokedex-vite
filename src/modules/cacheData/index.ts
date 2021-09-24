import { DateTime, Duration, DurationObjectUnits } from "luxon";
import Cookies from 'js-cookie';

type cacheTargetOptions = 'localStorage' | 'sessionStorage' | 'cookie';

type fetchCacheOptions = {
    cacheTarget? : cacheTargetOptions,
    ttl? : DurationObjectUnits,
}

const defaultOption : fetchCacheOptions = {
    cacheTarget: 'localStorage',
    ttl: { days: 1 }
};

const globalFetchKeyListName = 'fetchCacheKeyList';

/**
 * Register the cache key - api - into a gloabl repository in local storage.
 * This keeps track any cache related to fetchCache and avoids deletion of 
 * other important caches when clearing cache with clearAllFetchCacheData().
 * 
 * @param cacheTarget 
 * @param api 
 */

const registerNewCacheKey = (cacheTarget : cacheTargetOptions, api : string) => {

    // Setup Data
    const registerKey = (keyObject : object) => localStorage.setItem(globalFetchKeyListName, JSON.stringify(keyObject));
    const keyListString = localStorage.getItem(globalFetchKeyListName);

    // If no fetch key list, create new 
    if (!keyListString) {
        registerKey({ [cacheTarget] : [api] });
        return;
    }
    
    const keyListObject : object = JSON.parse(keyListString);

    // If no cache target, create new cache target
    if (!keyListObject[cacheTarget]) {
        registerKey({ ...keyListObject, [cacheTarget] : [api] })
        return;
    }

    // If key already exist, do not regist key
    const targetKeyIndex : number = keyListObject[cacheTarget].findIndex((cacheKey : string) => cacheKey === api);
    if (targetKeyIndex > -1) return;

    // Register the key
    keyListObject[cacheTarget].push(api);
    registerKey(keyListObject);
}

/**
 * Remove all cache data stored by fetchCache
 */

const clearAllFetchCacheData = () => {
    const keyList = JSON.parse(localStorage.getItem(globalFetchKeyListName));

    if (!keyList) return;

    for (const [key, api] of Object.entries(keyList)) {
        key === 'cookie' ? Cookies.remove(api.toString()) : window[key].removeItem(api);
    }

    localStorage.removeItem(globalFetchKeyListName);
}

/**
 * Fetch data from API and place the result into the appropriate Cache Location.
 * 
 * @param cacheType 
 * @param api 
 * @param ttl 
 * @returns 
 */

const setAndReturnNewCache = async (cacheTarget : cacheTargetOptions , api : string, ttl : DurationObjectUnits) => {

    const setCache = (data : any) => {
        switch (cacheTarget) {
            case 'localStorage' :
            case 'sessionStorage' : {
                const cacheExpiry = DateTime.local().plus(ttl).toMillis();
                const cacheData : string = JSON.stringify({ data, expiry: cacheExpiry });
                window[cacheTarget].setItem(api, cacheData);
                break;
            }
            case 'cookie' : {
                const cacheExpiry : number = Duration.fromObject(ttl).shiftTo('days').days;
                const cacheData : string = JSON.stringify(data);
                Cookies.set(api, cacheData, { expires: cacheExpiry });
                break;
            }
        }
    }
    
    try {
        const response = await fetch(api);
        const data = await response.json();
        setCache(data);
        registerNewCacheKey(cacheTarget, api);
        return data;
    } catch (err) {
        console.error(err);
    }

}

/**
 * A fetch mechanism that fetches data and caches the data inside storage or cookies.
 * When re-fetched, it will return cached data when available. Else, it creates a new cache data.
 * 
 * ** currently only supports API that returns JSON data
 * 
 * @param {string} api 
 * @param {fetchCacheOptions} options 
 * @async
 */

const fetchCache = async (api : string, options : fetchCacheOptions = defaultOption) => {
    
    const currentTime = DateTime.local();
    const { cacheTarget, ttl } = { ...defaultOption, ...options };
    const cacheTargetisCookie = cacheTarget === 'cookie';

    // Get Value of Cached Data
    const cachedValue = cacheTargetisCookie ? Cookies.get(api) : window[cacheTarget].getItem(api);

    // Create new Cache Data if it does not exist
    if (!cachedValue) return await setAndReturnNewCache(cacheTarget, api, ttl);

    // If Exist and is Cookie, return data immediately
    if (cacheTargetisCookie) return JSON.parse(cachedValue);

    // if Exist and is Storage, return data from Cache 
    // If Exist but Expired, set new data
    const { data, expiry } = JSON.parse(cachedValue);
    const isNotExpired = currentTime.toMillis() < expiry;
    return isNotExpired ? data : await setAndReturnNewCache(cacheTarget, api, ttl);
    

}

export { fetchCache, clearAllFetchCacheData };