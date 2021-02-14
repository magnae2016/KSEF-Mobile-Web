const MessageListener = (event) => {
    const { mode } = JSON.parse(event.data);
    switch (mode) {
        default:
            break;
    }
};

if (window.ReactNativeWebView) {
    /** android */
    document.addEventListener('message', MessageListener);
    /** ios */
    window.addEventListener('message', MessageListener);
}
