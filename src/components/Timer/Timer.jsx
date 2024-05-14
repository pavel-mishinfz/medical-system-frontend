import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';


const resendTimeout = 10000;

const Timer = ({handle, disabledInput}) => {

    const [sendAt, setSendAt] = useState(Date.now());
    const now = useNow(1000, sendAt, (now) => {
        if (sendAt && resendTimeout - (now - sendAt) < 0) {
            setSendAt();
        }
    });

    const msToRerend = sendAt ? resendTimeout - (now - sendAt) : 0;
    const isDisabled = msToRerend > 0;

    const handleSend = () => {
        handle();
        setSendAt(Date.now());
    }

    useEffect(() => {
        setTimeout(() => {
            disabledInput(true);
        }, resendTimeout);
    }, [sendAt]);

    return (
        <button type="button" disabled={isDisabled} onClick={() => {handleSend(); disabledInput(false)}}>
            {isDisabled ? `${timeToRerend(msToRerend)}` : <>Отправить снова</> }
        </button>
    );
};

export default Timer;


function timeToRerend(msToRerend) {
    let allSeconds = Math.floor(msToRerend / 1000);
    let minutes = Math.floor(allSeconds / 60);
    let seconds = allSeconds - minutes*60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}


function useNow(updateInterval, enabled, cb) {
    const cbRef = useRef(cb);
    cbRef.current = cb;
    const [now, setNow] = useState(Date.now());

    useLayoutEffect(() => {
        if (!enabled) {
            return;
        }

        setNow(Date.now());
        cbRef.current?.(Date.now());

        const interval = setInterval(() => {
            setNow(Date.now());
            cbRef.current?.(Date.now());
        }, updateInterval);

        return () => {
            clearInterval(interval);
        };

    }, [updateInterval, enabled]);

    return now;
}