import { Tracker } from '../../src';

const options = {
  api: '/endpoint',
  host: 'https://localhost',
};

/* Just a random object */
const event = {
  time: 1562087046793,
  uid: '1562087046793-ca0fbdb9-3db6-45b1-91c9-a1ae919bb667-68704d37-7a9e-4b90-9641-d1fe965d332c',
  env: {
    page: { title: 'a random event', url: 'https://www.google.com/' },
  },
};

describe('Tracker tests', () => {
  it('must receive the options to instanciate', () => {
    expect(() => new Tracker()).toThrow(Error);
  });

  it('creates an instance of Tracker', () => {
    const trackerClient = new Tracker(options);

    expect(trackerClient).toBeInstanceOf(Tracker);
  });

  it('calls the push method', () => {
    const trackerClient = new Tracker(options);
    const spy = jest.spyOn(trackerClient, 'push');

    trackerClient.push(event);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(event);
  });
});
