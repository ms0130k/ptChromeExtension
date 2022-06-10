'use strict';

chrome.commands.onCommand.addListener((show_deals) => {
  console.log(`Command "${show_deals}" triggered`);
  // how can I get to main.js to call deals()
});
