const today = new Date();

const at = hours => today.setHours(hours, 0);

export const sampleAppointments = [
  { startsAt: at(9), customer: { firstName: 'Charlie', lastName: 'Jarecsni' } },
  { startsAt: at(10), customer: { firstName: 'Frankie', lastName: 'Zoe' } },
  { startsAt: at(11), customer: { firstName: 'Casey', lastName: 'Moew' } },
  { startsAt: at(12), customer: { firstName: 'Ashley', lastName: 'Shimkow' } },
  { startsAt: at(13), customer: { firstName: 'Jordan', lastName: 'Baltikow' } },
  { startsAt: at(14), customer: { firstName: 'Jay', lastName: 'Jimson' } },
  { startsAt: at(15), customer: { firstName: 'Alex', lastName: 'Lameshy' } },
  { startsAt: at(16), customer: { firstName: 'Jules', lastName: 'Fokacsa' } },
  { startsAt: at(17), customer: { firstName: 'Stevie', lastName: 'Szar' } }
];
