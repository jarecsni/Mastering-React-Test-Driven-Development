import React, { useState } from 'react';

export const AppointmentForm = ({selectableServices, service, onSubmit}) => {
  const [selectedService, setSelectedService] = useState(service);
  const handleChange = ({ target }) => {
    setSelectedService(selectedService => target.value);
  }
  return (
    <form id="appointment" onSubmit={() => onSubmit(selectedService)}>
      <label htmlFor="service">Service</label>
      <select name="service" id="service" value={service} readOnly onChange={handleChange}>
          <option />
          {selectableServices.map(s => (
              <option key={s}>{s}</option>
          ))}
      </select>
    </form>
  );
}

AppointmentForm.defaultProps =  {
    selectableServices: [
        'Cut',
        'Blow-dry',
        'Cut & colour',
        'Beard trim',
        'Cut & beard trim',
        'Extensions'
    ]
}