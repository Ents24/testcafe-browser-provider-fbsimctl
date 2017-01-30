export default function (predicate, interval, timeout = Infinity) { 
    return new Promise((resolve, reject) => {
        var timeoutTimer  = null;
        var intervalTimer = null;

        function clearTimers () {
            clearInterval(intervalTimer);
            clearTimeout(timeoutTimer); 
        }

        function doPredicate () {
            Promise
                .resolve(predicate())
                .then(result => {
                    if (result)
                        return;

                    clearTimers();
                    resolve();
                })
                .catch(error => reject(error));
        }

        intervalTimer = setInterval(doPredicate, interval);

        if (timeout && isFinite(timeout)) {
            timeoutTimer  = setTimeout(() => {
                clearTimers();
                reject(new Error('Loop timeout'));
            }, timeout);

            timeoutTimer.unref();
        }

        doPredicate();
    });
}
