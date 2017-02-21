const defaults = {
  showOrHideInContextMenus: true
}

class Perfs {
  constructor() {
    let defaultKeys = Object.keys(defaults)

    this.readyPromise = new Promise((resolve, reject) => {
      chrome.storage.sync.get(defaultKeys, (results) => {
        return Promise.all(defaultKeys.map((defaultKey) => {

          if(typeof(results[defaultKey]) !== "undefined") {
            return Promise.resolve()
          }

          return new Promise((resolve, reject) => {
            chrome.storage.sync.set({
              [defaultKey]: defaults[defaultKey]
            }, resolve)
          })
        })).then(resolve)
      })
    })
  }

  ready(fn) {
    this.readyPromise.then(fn)
  }

  get(perfKey) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(perfKey, (results) => {
        resolve(results[perfKey])
      })
    })
  }

  set(perfKey, perfValue) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({[perfKey]: perfValue}, resolve)
    })
  }

  listenChange(perfKey, fn) {
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      if (!(perfKey in changes)) { return }
      var storageChange = changes[perfKey]
      fn(storageChange.newValue, storageChange.oldValue)
    })
  }
}

export default new Perfs()
