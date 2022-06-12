'use strict';

chrome.runtime.onMessage.addListener(() => {
  const setupApp = document.querySelector(
    '.salesforceIdentityAppLauncherHeader'
  );
  const homeApp = !!document.getElementsByTagName('one-appnav')[0]
    ? document
        .getElementsByTagName('one-appnav')[0]
        .getElementsByTagName('div')[4]
    : false;
  if (setupApp) setupApp.click();
  if (homeApp) homeApp.click();
});
