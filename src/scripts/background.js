'use strict';
import Perfs from 'mods/Perfs'

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// Copy from Just-Read
function runContentScripts(tab) {
  var tabId = tab ? tab.id : null; // Defaults to the current tab
  chrome.tabs.executeScript(tabId, {
    file: "scripts/contentscript.js", // Script to inject into page and run in sandbox
    allFrames: false // This injects script into iframes in the page and doesn't work before 4.0.266.0.
  });

  // Add a badge to signify the extension is in use
  chrome.browserAction.setBadgeBackgroundColor({color:[242, 38, 19, 230]});
  chrome.browserAction.setBadgeText({text: "on"});

  setTimeout(function() {
    chrome.browserAction.setBadgeText({text:""});
  }, 2000);
}

let pageCMHasCreated = false
function createPageCM() {
  pageCMHasCreated = true
  chrome.contextMenus.create({
    title: "识别文章中的成语",
    id: 'pageContextMenu',
    contexts: ['page'],
    onclick: runContentScripts
  })
}

function tooglePageCM(showOrHide) {
  if (showOrHide && !pageCMHasCreated) {
    createPageCM()
    return
  }

  if (!showOrHide) {
    chrome.contextMenus.remove('pageContextMenu')
    pageCMHasCreated = false
  }
}

Perfs.ready(() => {
  chrome.browserAction.onClicked.addListener(runContentScripts)
  Perfs.get('showOrHideInContextMenus').then(tooglePageCM)
  Perfs.listenChange('showOrHideInContextMenus', tooglePageCM)
})
