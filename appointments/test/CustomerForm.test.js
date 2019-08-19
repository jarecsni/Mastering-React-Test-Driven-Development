import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"]`);

  const expectInputField = (field) => {
      expect(field).not.toBeNull();
      expect(field.tagName).toEqual('INPUT');
      expect(field.type).toEqual('text');
  }

  const firstNameField = () => form('customer').elements.firstName;

  const labelFor = (formElement) => container.querySelector(`label[for="${formElement}"]`);

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('renders the first name field as a text box', () => {
    render(<CustomerForm/>);
    const field = firstNameField()
    expectInputField(field);
  });

  it('includes the existing value for the first name', () => {
    render(<CustomerForm firstName="Ashley"/>);
    const field = firstNameField();
    expect(field.value).toEqual('Ashley');
  });

  it('renders a label for the first name field', () => {
    render(<CustomerForm/>);
    expect(labelFor('firstName')).not.toBeNull();
    expect(labelFor('firstName').textContent).toEqual('First name');
  });

  it('assigns an id that matches the label id to the first name field', () => {
    render(<CustomerForm/>);
    expect(firstNameField().id).toEqual('firstName');
  });
});
