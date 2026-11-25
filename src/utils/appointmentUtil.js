
const appointment_duration = 60;

const booking_time = Array.from(
    {length: 11},
    (_, index) => `${index + 10}:00`
)
function getBookingDay(date) {
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return null
    }
    const dayStart = new Date(`${date}T00:00:00-03:00`) 

    if (isNaN(dayStart.getTime()) || dayStart.toISOString().slice(0,10) !== date) {
        return null
    }
    return dayStart
}
function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number)

    return hours * 60 + minutes
}

export{
    getBookingDay,
    timeToMinutes,
    appointment_duration,
    booking_time,
}