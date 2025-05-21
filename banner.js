(async function () {
    try {
        const s = document.querySelector('script[adunit-id]');

        let url = `https://ssp-01.veonadx.com/bid/direct?plc=${s.getAttribute('adunit-id')}&mpid=11121212`;

        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState > 3) {
                if (request.status !== 200) {
                    window.postMessage('AdError', '*');
                    console.log('Ad Error occurred');
                    return;
                }
                const container = document.createElement('div');
                container.innerHTML = request.responseText;
                s.after(container);
                parent.postMessage('AdLoaded', '*');
            }
        };
        request.send();

        window.addEventListener('message', function (event) {
            if (event.data === 'AdError') {
                console.log('Ad Error occurred');
            }
        });
    } catch (error) {
        console.log(error);
    }
})();
