import React, { useState } from 'react';
import { start } from 'repl';

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return Array(totalSlots)
    .fill([startTime])
    .reduce((acc, _, i) => 
      acc.concat([startTime + (i * increment)])
    );
};

const toTimeValue = timeStamp => 
  new Date(timeStamp).toTimeString().substring(0, 5);

const weeklyDateValues = (startDate) => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return Array(7)
    .fill([midnight])
    .reduce((acc, _, i) => 
      acc.concat([midnight + (i * increment)])
    );
};

const toShortDate = (timeStamp) => {
  const [day, _, dayOfMonth] = new Date(timeStamp)
    .toDateString()
    .split(' ');
  return `${day} ${dayOfMonth}`;
}

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today
}) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  const dates = weeklyDateValues(today);
  return ( 
    <table id="time-slots">
      <thead>
        <tr>
          <th/>
          {dates.map(d => (
            <th key={d}>{toShortDate(d)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const AppointmentForm = ({
  selectableServices,
  service,
  salonOpensAt,
  salonClosesAt,
  onSubmit,
  today
}) => {
  const [appointment, setAppointment] = useState({ service });

  const handleServiceChange = ({ target: { value } }) =>
    setAppointment(appointment => ({
      ...appointment,
      service: value
    }));

  return (
    <form id="appointment" onSubmit={() => onSubmit(appointment)}>
      <label htmlFor="service">Salon service</label>
      <select
        name="service"
        id="service"
        value={service}
        onChange={handleServiceChange}>
        <option />
        {selectableServices.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <TimeSlotTable 
        salonOpensAt={salonOpensAt} 
        salonClosesAt={salonClosesAt}
        today={today}
      />
    </form>
  );
};

AppointmentForm.defaultProps = {
  salonOpensAt: 10,
  salonClosesAt: 19,
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ],
  today: new Date()
};
