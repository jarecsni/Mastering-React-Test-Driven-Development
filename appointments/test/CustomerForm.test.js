import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('customer').elements[name];
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);
  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };
  const itRendersAsATextBox = (fieldName) => 
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  const itIncludesTheExistingValue = (fieldName) => 
    it('includes the existing value', () => {
      render(<CustomerForm {...{[fieldName]: 'value'}} />);
      expect(field(fieldName).value).toEqual('value');
    });  
  const itRendersALabel = (fieldName, labelText) => 
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(
        labelText
      );
    });
  const itAssignsAMatchingId = (fieldName, idValue) =>
  it('assigns an id that matches the label id', () => {
    render(<CustomerForm />);
    expect(field(fieldName).id).toEqual(idValue);
  });
  const itSavesExistingValue = (fieldName) => 
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{[fieldName]: 'value'}}
          onSubmit={props =>
            expect(props[fieldName]).toEqual('value')
          }
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
    });    
  const itSavesNewValue = (fieldName, value) => 
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{[fieldName]: 'existingValue'}}
          onSubmit={props =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      );
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value }
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });


  describe('first name field', () => {
    itRendersAsATextBox('firstName'); 
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAMatchingId('firstName', 'firstName');
    itSavesExistingValue('firstName');
    itSavesNewValue('firstName', 'Ashley');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAMatchingId('lastName', 'lastName');
    itSavesExistingValue('lastName');
    itSavesNewValue('lastName', 'Bentley');
  });

  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone number');
    itAssignsAMatchingId('phoneNumber', 'phoneNumber');
    itSavesExistingValue('phoneNumber');
    itSavesNewValue('phoneNumber', '07809423200');
  });
});
