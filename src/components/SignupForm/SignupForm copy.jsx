import { useState } from 'react';
import { Formik, Form, Field, setFieldValue } from 'formik';
import styles from './signupform.module.scss';
import localFont from 'next/font/local';
import Button from '../Button/Button';
import FormField from '../Field/Field';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';

import * as Yup from 'yup';

//TODO:
// Refactor: state, look to store formnik as state
// Revert to JSX for form fields
// Postcode validation
// Take a closer look at Formnik documentation
// Simplify as much as possible

const sansRegular = localFont({
  src: '../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Regular.ttf',
});

const sansLight = localFont({
  src: '../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Light.ttf',
});
// Declare validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  postcode: Yup.string().required('Postcode is required'),
  addressLine1: Yup.string().required('Enter an Address'),
  townOrCity: Yup.string().required('Enter a Town or City'),
  country: Yup.string().required('Enter a Country'),
});

const SignupForm = () => {
  const router = useRouter();
  const [manualAddress, setManualAddress] = useState(false);
  const [iconState, setIconState] = useState(false);
  const [enteredPostcode, setEnteredPostcode] = useState('');
  const [sortedAddressList, setSortedAddressList] = useState({});
  const [findAddress, setFindAddress] = useState(false);

  const initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    addressLine1: '',
    townOrCity: '',
    country: '',
    postcode: '',
  };

  const formFields = {
    primaryFields: [
      { name: 'email', type: 'email', label: 'Email' },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        toggleIcon: true,
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        toggleIcon: true,
      },
      { name: 'firstName', type: 'text', label: 'First Name' },
      { name: 'lastName', type: 'text', label: 'Last Name' },
      {
        name: 'postcode',
        type: 'text',
        label: 'Postcode',
        splitLayout: true,
      },
    ],
    secondaryFields: [
      {
        name: 'addressLine1',
        type: 'text',
        label: 'Address Line 1',
      },
      {
        name: 'addressLine2',
        type: 'text',
        label: 'Address Line 2 (optional)',
      },
      {
        name: 'addressLine3',
        type: 'text',
        label: 'Address Line 3 (optional)',
      },
      { name: 'townOrCity', type: 'text', label: 'Town or City', value: '' },
      { name: 'country', type: 'text', label: 'Country', value: '' },
    ],
  };

  const [primaryFields, setPrimaryFields] = useState(formFields.primaryFields);
  const [secondaryFields, setSecondaryFields] = useState(
    formFields.secondaryFields
  );
  // Set postcode input
  const handlePostcodeInput = (e) => {
    e.preventDefault();
    setEnteredPostcode(e.currentTarget.value);
  };
  // Handles find address box
  const handleFindAddress = () => {
    setFindAddress(!findAddress);
    fetchPostcode(enteredPostcode);
  };
  const fetchPostcode = () => {
    // Fetch postcode with postcode as parameter
    fetch(
      `https://api.getAddress.io/find/${enteredPostcode}?api-key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.addresses.length >= 1) {
          formatAddresses(data);
        } else {
          console.log('No addresses found');
        }
      });
  };
  // Handle address box list items
  const handleAddressItem = (e, setFieldValue) => {
    const clickedFieldValue = e.currentTarget.innerHTML.split(', ');
    setFieldValue('addressLine1', parse(clickedFieldValue[0]));
    setFieldValue('townOrCity', parse(clickedFieldValue[1]));
    setFieldValue('country', parse(clickedFieldValue[2]));
    setManualAddress(true);
    setFindAddress(false);
  };
  // Format address data
  const formatAddresses = (address) => {
    let x = address.split(', ').filter(Boolean).join(', ');
    let formattedAddress = Object.values(address.addresses).map((address) => {
      x += `, ${enteredPostcode.toUpperCase()}`;
      return x;
    });
    setSortedAddressList(formattedAddress);
  };

  const handleFormSubmission = (e) => {
    // if (Object.keys(e).length >= 1) {
    //   setPushErrorMessage(true);
    // } else {
    //   setPushErrorMessage(false);
    //   router.push('/signup-success');
    // }
  };

  // Generate form fields
  const generateFormFields = (
    errors,
    touched,
    formType,
    setFieldTouched,
    setFieldValue
  ) => {
    const arrToMap = formType === 1 ? primaryFields : secondaryFields;
    const fields = arrToMap.reduce((acc, field) => {
      const { name, type, label, splitLayout, toggleIcon } = field;
      const fieldError = errors[name] && touched[name];

      const handleChange = (e) => {
        const { name, value } = e.target;
        // Set postcode field input value to state
        name === 'postcode' && handlePostcodeInput(e);
        setFieldValue(name, value);
      };

      acc.push(
        <div
          key={name}
          className={`${
            fieldError ? styles.form_field_error : styles.form_field
          } ${sansLight.className}`}
        >
          <FormField
            field={
              <Field
                onBlur={() => setFieldTouched(field.name, true)}
                className={touched.name && errors.name ? 'error' : null}
                type={
                  type === 'password' ? (iconState ? 'text' : 'password') : type
                }
                id={name}
                name={name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            }
            setIconState={setIconState}
            iconState={iconState}
            type={type}
            id={name}
            handleChange={(e) => {
              handleChange(e);
            }}
            setFieldTouched={setFieldTouched}
            touched={touched}
            requiresIcon={toggleIcon}
            enableButton={splitLayout}
            buttonOnClick={handleFindAddress}
            buttonText="Find Address"
            buttonType="button"
            buttonDisabled={manualAddress}
            labelFor={name}
            labelText={fieldError ? errors[name] : label}
          />
        </div>
      );

      return acc;
    }, []);

    return fields;
  };

  return (
    <Formik
      // initialValues={formValues}
      initialValues={initialFormValues}
      validationSchema={validationSchema}
    >
      {({
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
        validateForm,
        validateField,
      }) => (
        <div className={styles.component}>
          <div className={styles.form_intro}>
            <h3 className={sansRegular.className}>Create your Account</h3>
            <p className={sansLight.className}>
              In 30 seconds you&#39;ll be a sign up pro!
            </p>
          </div>
          <Form className={styles.form}>
            {generateFormFields(
              errors,
              touched,
              1,
              setFieldTouched,
              setFieldValue
            )}
            {manualAddress &&
              generateFormFields(
                errors,
                touched,
                2,
                setFieldTouched,
                setFieldValue
              )}
            {!manualAddress && (
              <div className={styles.form_field}>
                <button
                  className={`${styles.enterAddressManually} ${sansRegular.className}`}
                  onClick={() => setManualAddress(!manualAddress)}
                  type="button"
                >
                  Enter address manually
                </button>
              </div>
            )}

            {findAddress && (
              <div className={styles.addressBox}>
                {sortedAddressList.length >= 1 && (
                  <ul>
                    {sortedAddressList.map((item, idx) => (
                      <li
                        key={idx}
                        className={sansRegular.className}
                        onClick={(e) => handleAddressItem(e, setFieldValue)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {Object.keys(errors).length > 0 && (
              <div className={styles.errorMessage}>
                Error. Please review your details
              </div>
            )}
            <Button
              text="Sign Up"
              type="submit"
              onClick={() =>
                validateForm().then((e) => handleFormSubmission(e))
              }
              // onClick={(e) => handleFormSubmission(e, errors, values)}
              className={styles.signupButton}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignupForm;
