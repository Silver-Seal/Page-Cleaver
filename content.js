if (typeof window.splitterInitialized === 'undefined') {
    window.splitterInitialized = true;

    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "toggle") {
            toggleSplitScreen();
        }
    });
}

function toggleSplitScreen() {
    const existingWrapper = document.getElementById('split-screen-wrapper');

    if (existingWrapper) {
        existingWrapper.remove();
        document.body.classList.remove('split-active');
        return;
    }

    const pageHTML = document.body.innerHTML;

    const wrapper = document.createElement('div');
    wrapper.id = 'split-screen-wrapper';

    const leftPane = document.createElement('div');
    leftPane.className = 'split-pane';
    leftPane.id = 'left-pane';
    leftPane.innerHTML = `<div class="inner-content">${pageHTML}</div>`;

    const rightPane = document.createElement('div');
    rightPane.className = 'split-pane';
    rightPane.id = 'right-pane';
    rightPane.innerHTML = `<div class="inner-content">${pageHTML}</div>`;

    wrapper.appendChild(leftPane);
    wrapper.appendChild(rightPane);
    document.body.appendChild(wrapper);
    document.body.classList.add('split-active');
}