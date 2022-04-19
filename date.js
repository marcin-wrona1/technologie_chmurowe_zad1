const getDateString = (time) => (
	time instanceof Date ? (
        `${time.getFullYear()}-${String(time.getMonth()+1).padStart(2, '0')}-${String(time.getDate()).padStart(2, '0')} ${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}.${String(time.getMilliseconds()).padStart(3, '0')}`
	) : (
		String()
	)
);

const getTimezone = (time) => {
    if (!time instanceof Date)
        return String();

    const hours = time.getTimezoneOffset() / 60,
        prefix = hours >= 0 ? '+' : '-',
        hours_abs = Math.abs(hours)
    ;
    return `GMT${prefix}${String(hours_abs).padStart(2, '0').padEnd(4, '0')}`
};

export {
    getDateString,
    getTimezone
};
