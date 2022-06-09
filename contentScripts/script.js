'use strict';

const timeStart = new Date().getTime();

const observerForInitialLoad = new MutationObserver((mutations) => {
  mutations.forEach((mutationRecord) => {
    [...mutationRecord.addedNodes].forEach((node) => {
      if (node.nodeName === 'BODY') {
        console.log(`BODY loads at ${new Date().getTime() - timeStart}`);
        node.classList.add('MY_EXTENSION_BLUE');
      }
    });
  });
});

observerForInitialLoad.observe(document, {
  childList: true,
  subtree: true,
});

window.addEventListener('DOMContentLoaded', () => {
  console.log(`DOMContentLoaded at ${new Date().getTime() - timeStart}`);
});

window.addEventListener('load', () => {
  console.log(`load at ${new Date().getTime() - timeStart}`);
});

myExtensionNext();

const myExtensionScript = () => {
  console.log('script');
};

myExtensionScript();
