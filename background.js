let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);
  if (command === 'open-app-launcher') {
    getCurrentTab().then((tab) => {
      console.log('--');
      console.log(tab);
      console.log('--');
      const forceRegex = /https:\/\/.*\.force\.com\/.*/;
      console.log(forceRegex.test(tab.url));
      if (forceRegex.test(tab.url)) {
        openAppLauncher();
      }
    });
  }
});

function openAppLauncher() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'open-app-launcher' },
      (response) => console.log(response)
    );
  });
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: contentScriptFunc,
    args: ['action'],
  });
});

function contentScriptFunc(name) {
  alert(`"${name}" executed`);
}

chrome.commands.getAll().then((commands) => {
  for (let command of commands) {
    for (const [key, value] of Object.entries(command)) {
      console.log(`${key}: ${value}`);
    }
  }
});
