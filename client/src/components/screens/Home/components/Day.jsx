import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

function Day({ user }) {
    const timezone = user.user.timezone;
    const [time, setTime] = useState(moment().tz(timezone).format('h:mm A'));

    useEffect(() => {
        // Calculate milliseconds until the next minute
        const now = moment();
        const nextMinute = moment().add(1, 'minute').startOf('minute');
        const delayUntilNextMinute = nextMinute.diff(now);
    
        // Update time at the start of the next minute, then every minute after that
        const timeoutId = setTimeout(() => {
            setTime(moment().tz(timezone).format('h:mm A')); // Update immediately at the next minute
            const intervalId = setInterval(() => {
                setTime(moment().tz(timezone).format('h:mm A'));
            }, 60000); // Continue updating every minute
            return () => clearInterval(intervalId);
        }, delayUntilNextMinute);
    
        return () => clearTimeout(timeoutId);
    }, [timezone]);

    return (
        <section className="bg-colorBg text-colorText rounded p-2 w-full text-2xl">
            <h2>Today is {moment().tz(timezone).format('dddd, MMMM Do')}</h2>
            <p>{time}</p>
        </section>
    );
}

Day.propTypes = {
    user: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string,
            timezone: PropTypes.string.isRequired,
            email: PropTypes.string,
            name: PropTypes.string
        })
    }).isRequired
};

export default Day;