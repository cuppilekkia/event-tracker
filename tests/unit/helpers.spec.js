import { getBrowser, generateId, acceptCookies } from '../../src/helpers';

describe('helpers -> getBrowser tests', () => {
  it('returns an object', () => {
    const browser = getBrowser();

    expect(typeof browser).toBe('object');
  });
  it('the object has browser, screen and window properties', () => {
    const browser = getBrowser();

    expect(browser).toHaveProperty('browser');
    expect(typeof browser.browser).toBe('object');

    expect(browser).toHaveProperty('screen');
    expect(typeof browser.screen).toBe('object');

    expect(browser).toHaveProperty('window');
    expect(typeof browser.window).toBe('object');
  });
});

describe('helpers -> generateID tests', () => {
  it('returns a string', () => {
    const id = generateId();

    expect(typeof id).toBe('string');
  });
  it('the ID\'s length is 36 chars', () => {
    const id = generateId();

    expect(id.length).toBe(36);
  });

  it('the ID\'s pattern is correct', () => {
    const id = generateId();

    expect(id).toMatch(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
  });
});

describe('helpers -> acceptCookies tests', () => {
  it('returns a boolean', () => {
    const acceptCookie = acceptCookies();

    expect(typeof acceptCookie).toBe('boolean');
  });
  it('is true', () => {
    const acceptCookie = acceptCookies();

    expect(acceptCookie).toBe(true);
  });
});
