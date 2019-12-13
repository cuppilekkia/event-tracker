export function getScreen() {
  if (typeof window === 'undefined' || !window.screen) return {};

  const keys = ['height', 'width', 'colorDepth', 'pixelDepth', 'availHeight', 'availWidth'];
  const output = {};

  for (let i = 0; i < keys.length; i += 1) {
    output[keys[i]] = window.screen[keys[i]] ? window.screen[keys[i]] : null;
  }

  output.orientation = {
    angle: window.screen.orientation ? window.screen.orientation.angle : 0,
    type: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
  };

  return output;
}

export default {
  getScreen,
};
