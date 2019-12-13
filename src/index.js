/* eslint-disable class-methods-use-this */
import Cookies from 'js-cookie';
import { generateId, getBrowser, acceptCookies } from './helpers';

// import '@babel/polyfill';

export class Tracker {
  constructor(params = null) {
    if (!params || !params.host || !params.api) {
      throw new Error('Tracker must receive the options to start!');
    }
    console.log('%cTRACKER %c-`ღ´-', 'color: red', 'color: green; font-weight: bold;');

    // set defaults
    this.user = {};
    this.baseUrl = params.host;
    this.trackerUrl = params.api;
    this.visitCookieName = 'evevisit';
    this.visitorCookieName = 'evevisitor';

    this.visitTtl = 1 / 6; // 4 hours
    this.visitorTtl = 365 * 2; // 2 years

    // init standard objects
    this.init();

    // init cookies
    this.initCookies();

    // setup unload listener
    this.initUnloadListener();
  }

  init() {
    // - page data
    this.page = {
      title: document.title,
      url: window.location.href,
    };

    // - referrer data
    this.referrer = {
      url: document.referrer,
    };
    // - tech/browser data
    this.tech = getBrowser();
  }

  initCookies() {
    if (!this.loadTrackingCookie(this.visitorCookieName)
        || this.checkCookieLifetimeExpired(this.visitorCookieName, this.visitorTtl)) {
      this.user[this.visitorCookieName] = this.generateCookiePayload();
      Cookies.set(
        this.visitorCookieName,
        this.user[this.visitorCookieName],
        { expires: this.visitorTtl },
      );
    } else {
      Cookies.set(
        this.visitorCookieName,
        this.user[this.visitorCookieName],
        { expires: this.visitorTtl },
      );
    }
    if (!this.loadTrackingCookie(this.visitCookieName)
        || this.checkCookieLifetimeExpired(this.visitCookieName, this.visitTtl)) {
      this.user[this.visitCookieName] = this.generateCookiePayload();
      Cookies.set(
        this.visitCookieName,
        this.user[this.visitCookieName],
        { expires: this.visitTtl },
      );
    } else {
      Cookies.set(
        this.visitCookieName,
        this.user[this.visitCookieName],
        { expires: this.visitTtl },
      );
    }
  }

  push(event) {
    const data = {};

    data.time = Date.now();
    data.uid = `${data.time}-${this.user[this.visitCookieName].token}-${this.user[this.visitorCookieName].token}`;
    data.event = { ...event };

    data.env = {
      page: this.page,
      referrer: this.referrer,
      ...this.tech,
      performance: typeof performance !== 'undefined' ? performance.timing : null,
    };

    data.user = {
      ...this.user,
    };

    this.sendRequest(data);
    return true;
  }

  loadTrackingCookie(cookieName) {
    if (!acceptCookies()) {
      console.error("Browser don't accept cookies");
      return false;
    }

    if (!Cookies.get(cookieName)) {
      return false;
    }

    // load Cookie JSON data
    this.user[cookieName] = Cookies.getJSON(cookieName);
    return true;
  }

  generateCookiePayload() {
    return {
      token: generateId(),
      startTime: new Date().toUTCString(),
    };
  }

  checkCookieLifetimeExpired(cookieName, ttl) {
    if (!this.user[cookieName]) {
      return false;
    }

    const now = Date.now();
    const cookieStartTime = new Date(this.user[cookieName].startTime);
    const timeDiff = now - cookieStartTime.getTime();

    const sessionLifetimeInHours = ttl * 24;
    const hourDiff = (timeDiff / (1000 * 60 * 60)).toFixed(1);

    return hourDiff > sessionLifetimeInHours;
  }

  initUnloadListener() {
    window.addEventListener('unload', (event) => {
      this.push({
        event,
        eventAction: 'WindowUnload',
        eventCategory: 'Window',
        eventLabel: 'Window Unload',
      });
    });
  }

  sendRequest(data) {
    return new Promise((resolve) => {
      try {
        navigator.sendBeacon(`${this.baseUrl}${this.trackerUrl}`, JSON.stringify(data));
        resolve(true);
      } catch (error) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${this.baseUrl}${this.trackerUrl}`, true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(true);
          }
          resolve(false);
        };
        xhr.send(JSON.stringify(data));
      }
    });
  }

  status() {
    console.log(
      `%cThe tracker instance is running. 
You can now use the push({...}) method to send events.`,
      'font-family:monospace; color:red;',
    );
  }
}

export default Tracker;
