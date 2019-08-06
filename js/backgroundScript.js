chrome.tabs.onActivated.addListener(function(info){
chrome.tabs.get(info.tabId, function(change){
        if(change.url == undefined){
            chrome.browserAction.setBadgeText( { text: '' } );
            chrome.browserAction.setBadgeBackgroundColor({color: [0,0,0,0]});
            console.log('undefined');
        }
        else if(change.url.indexOf('ttsaas') < 0){
            chrome.browserAction.setBadgeText( { text: '' } );
            chrome.browserAction.setBadgeBackgroundColor({color: [0,0,0,0]});
            console.log('not matching1');
        }
        else{
            chrome.browserAction.setBadgeText( { text: '  ' } );
            chrome.browserAction.setBadgeBackgroundColor({color: [50,200,50,100]});
            console.log('matched');
        }
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, change, tab){
    if(tab.url == undefined){
        return;
    }
    else if(change.url.indexOf('ttsaas') < 0){
        chrome.browserAction.setBadgeText( { text: '' } );
        chrome.browserAction.setBadgeBackgroundColor({color: [0,0,0,0]});
        console.log('not matching2');
    }
    else{
        chrome.browserAction.setBadgeText( { text: '  ' } );
        chrome.browserAction.setBadgeBackgroundColor({color: [50,200,50,100]});
        console.log('matched');
    }
});