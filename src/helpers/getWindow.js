export function getWindow() {
  if (typeof document === 'undefined') return {};

  const { body } = document;
  const html = document.documentElement;

  const output = {
    height: 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight,
    width: 'innerWidth' in window ? window.innerWidth : document.documentElement.offsetWidth,
    scrollHeight:
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      ) || null,
  };

  if (window.screen) {
    output.ratio = {
      height: window.screen.availHeight
        ? parseFloat((window.innerHeight / window.screen.availHeight).toFixed(2))
        : null,
      width: window.screen.availWidth
        ? parseFloat((window.innerWidth / window.screen.availWidth).toFixed(2))
        : null,
    };
  }

  return output;
}

export default {
  getWindow,
};
