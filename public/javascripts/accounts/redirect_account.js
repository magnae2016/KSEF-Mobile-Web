'use strict';

// send postMessage (Async Storage)
if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
        JSON.stringify({ mode: 'store_security', ...window.nmain.gv })
    );
}

location.replace('/');
