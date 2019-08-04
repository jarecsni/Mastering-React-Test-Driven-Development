import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {
  Appointment,
  AppointmentsDayView
} from '../src/AppointmentsDayView';

describe('Appointment', () => {
  let container;
  let customer;
  const expectedRowCount = 5;
  const defaultAppointment = {};

  beforeEach(() => {
    container = document.createElement('div');
  });

  const render = component =>
    ReactDOM.render(component, container);

  const expectRow = (row, head, content) => {
    expect(row).not.toBeNull();
    expect(row.querySelector('th')).not.toBeNull();
    expect(row.querySelector('th').textContent).toMatch(head);
    expect(row.querySelector('td')).not.toBeNull();
    expect(row.querySelector('td').textContent).toMatch(content);
  }

  it('renders the customer first name', () => {
    customer = { firstName: 'Ashley' };
    render(<Appointment customer={customer} {...defaultAppointment}/>);
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect(table.querySelectorAll('tr')).toHaveLength(expectedRowCount); 
    const firstNameRow = table.querySelector('.first-name');
    expectRow(firstNameRow, 'First name:', 'Ashley');
  });

  it('renders another customer first name', () => {
    customer = { firstName: 'Jordan' };
    render(<Appointment customer={customer} {...defaultAppointment}/>);
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect(table.querySelectorAll('tr')).toHaveLength(expectedRowCount); 
    const firstNameRow = table.querySelector('.first-name');
    expectRow(firstNameRow, 'First name:', 'Jordan');
  });

  it('renders the lastName correctly', () => {
    customer = { firstName: 'Jordan', lastName: 'Smiths'};
    render(<Appointment customer={customer} {...defaultAppointment}/>);
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect(table.querySelectorAll('tr')).toHaveLength(expectedRowCount); 
    const lastNameRow = table.querySelector('.last-name');
    expectRow(lastNameRow, 'Last name:', 'Smiths');
  });

  it('renders the phone Number correctly', () => {
    customer = { firstName: 'Jordan', lastName: 'Smiths', phoneNumber: '123456'};
    render(<Appointment customer={customer} {...defaultAppointment}/>);
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect(table.querySelectorAll('tr')).toHaveLength(expectedRowCount); 
    const phoneRow = table.querySelector('.phone');
    expectRow(phoneRow, 'Phone:', '123456');
  });
  it('renders the stylist correctly', () => {
    customer = { firstName: 'Jordan', lastName: 'Smiths', 
      phoneNumber: '123456'};
    render(<Appointment customer={customer} stylist="Lynda"/>);
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect(table.querySelectorAll('tr')).toHaveLength(expectedRowCount); 
    const phoneRow = table.querySelector('.stylist');
    expectRow(phoneRow, 'Stylist:', 'Lynda');
  });
  it('renders the service correctly', () => {
    customer = { firstName: 'Jordan', lastName: 'Smiths', 
      phoneNumber: '123456'};
    
    render(<Appointment customer={customer} service="Wash & blow"/>);
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect(table.querySelectorAll('tr')).toHaveLength(expectedRowCount); 
    const phoneRow = table.querySelector('.service');
    expectRow(phoneRow, 'Service:', 'Wash & blow');
  });
  it('renders an appointment header with the time', () => {
    const today = new Date();
    const startsAt = today.setHours(12, 0);
    render(<Appointment customer={customer} startsAt={startsAt}/>);
    const header = container.querySelector('.header');
    expect(header).not.toBeNull();
    expect(header.textContent).toMatch("12:00");
  })
});

describe.skip('AppointmentsDayView', () => {
  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley' }
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' }
    }
  ];
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  const render = component =>
    ReactDOM.render(component, container);

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(
      container.querySelector('div#appointmentsDayView')
    ).not.toBeNull();
  });

  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ol').children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(
      container.querySelectorAll('li')[0].textContent
    ).toEqual('12:00');
    expect(
      container.querySelectorAll('li')[1].textContent
    ).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch('Ashley');
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li > button')).toHaveLength(
      2
    );
    expect(
      container.querySelectorAll('li > button')[0].type
    ).toEqual('button');
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch('Jordan');
  });
});
