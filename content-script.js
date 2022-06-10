'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const setupApp = document.querySelector(
    '.salesforceIdentityAppLauncherHeader'
  );
  const homeApp = document
    .getElementsByTagName('one-appnav')[0]
    .getElementsByTagName('div')[4];

  if (setupApp) setupApp.click();
  if (homeApp) homeApp.click();
});
