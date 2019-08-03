
const today = new Date();
const at = hours => today.setHours(hours, 0);

export const sampleAppointments = [
    {startsAt: at(9), customer: {firstName: 'Charlie'}},
    {startsAt: at(10), customer: {firstName: 'Frankie'}},
    {startsAt: at(11), customer: {firstName: 'Lofaszie'}},
    {startsAt: at(12), customer: {firstName: 'Poccsie'}},
];