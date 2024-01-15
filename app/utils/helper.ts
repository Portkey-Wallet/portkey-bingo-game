export const initFontSize = (doc: Document, win: Window, isMobile: boolean) => {
  const docEle = doc.documentElement;
  const event = 'onorientationchange' in window ? 'orientationchange' : 'resize';
  const fn = function () {
    const width = docEle.clientWidth;
    const unitWidth = isMobile ? 375 : 1920;
    width && (docEle.style.fontSize = 10 * (width / unitWidth) + 'px');
  };
  fn();
  win.addEventListener(event, fn, false);
  doc.addEventListener('DOMContentLoaded', fn, false);
};

export const loadVsConsoleInDevEnv = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js';
    document.body.appendChild(script);
    script.onload = () => {
      setTimeout(() => {
        new window.VConsole();
      }, 0);
    };
  }
};

export const loadImages = (sourceMap: Array<string>, callback: () => void) => {
  let count = 0;
  const timeTask = new Promise(function (resolve) {
    setTimeout(resolve, 60000, false);
  });

  const scheduleTask = new Promise(function (resolve) {
    const start = Date.now();
    const schedule = (src: string) => {
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => {
        count = count + 1;
        if (count >= sourceMap.length) {
          if (Date.now() - start > 3000) {
            resolve(true);
          } else {
            setTimeout(() => {
              resolve(true);
            }, 3000 - (Date.now() - start));
          }
        }
      };
    };
    sourceMap.forEach((src) => {
      schedule(src);
    });
  });

  Promise.race([timeTask, scheduleTask]).then(() => {
    callback();
  });
};
