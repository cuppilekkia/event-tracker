import { getScreen } from './getScreen';
import { getWindow } from './getWindow';

export default function getBrowser() {
  return {
    browser: {
      cookies: typeof navigator.cookieEnabled !== 'undefined' ? navigator.cookieEnabled : false,
      codeName: navigator.appCodeName,
      language: navigator.language,
      name: navigator.appName,
      online: navigator.onLine,
      platform: navigator.platform,
      useragent: navigator.userAgent,
      version: navigator.appVersion,
    },
    screen: getScreen(),
    window: getWindow(),
  };
}
