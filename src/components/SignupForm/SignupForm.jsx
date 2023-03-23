import { Field, Formik, Form, setFieldValue } from 'formik';
import styles from './signupform.module.scss';
import localFont from 'next/font/local';
import Button from '../Button/Button';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useState } from 'react';
const sansRegular = localFont({
  src: '../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Regular.ttf',
});

const sansLight = localFont({
  src: '../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Light.ttf',
});

const SignupForm = () => {
  const [listOfAddresses, setListOfAddresses] = useState({});

  const formFieldTypes = {
    email: 'email',
    text: 'text',
    password: 'password',
  };
  const formFieldSchema = {
    email: { label: 'Email', value: '' },
    password: { label: 'Password', value: '' },
    confirmPassword: { label: 'Confirm Password', value: '' },
    firstName: { label: 'First Name', value: '' },
    lastName: { label: 'Last Name', value: '' },
    postcode: { label: 'Postcode', value: '' },
    addressLine1: { label: 'Address Line 1', value: '' },
    addressLine2: { label: 'Address Line 2', value: '' },
    addressLine3: { label: 'Address Line 3', value: '' },
    townOrCity: { label: 'Town or City', value: '' },
    country: { label: 'Country', value: '' },
  };
  // Reduce formFieldSchema to key: value
  const formInitialValues = Object.keys(formFieldSchema).reduce((acc, key) => {
    acc[key] = formFieldSchema[key].value || '';
    return acc;
  }, {});

  // Handle address box list items
  const handleAddressItem = (e, setFieldValue) => {
    const addressParts = e.currentTarget.innerHTML.split(', ').map(parse);
    const [addressLine1, townOrCity, country] = addressParts;
    setFieldValue('addressLine1', parse(addressLine1));
    setFieldValue('townOrCity', parse(townOrCity));
    setFieldValue('country', parse(country));

    // TODO close address list box
  };

  const fetchPostcode = async (postcode) => {
    const response = await fetch(
      `https://api.getAddress.io/find/${postcode}?api-key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const postcodeData = await response.json();

    if (postcodeData?.addresses?.length < 1) {
      throw new RangeError('No addresses were found for the given postcode');
    }

    const formattedAddresses = postcodeData.addresses.map((address) => {
      const addressParts = address.split(', ').filter(Boolean);
      addressParts.push(postcode.toUpperCase());

      return addressParts.join(', ');
    });
    setListOfAddresses(formattedAddresses);
  };

  // TODO: Validate postcode

  const validatePostcode = (postcode) => {
    let error;
    const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]? [0-9][A-Z]{2}$/;

    if (!postcodeRegex.test(postcode)) {
      error = 'Invalid UK postcode';
    } else {
      fetchPostcode(postcode);
    }

    return error;
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Please enter a valid email')
          .required('Email is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .min(8, 'Password must be at least 8 characters')
          .required('Confirm password is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        postcode: Yup.string().required('Postcode is required'),
        addressLine1: Yup.string().required('Enter an Address'),
        townOrCity: Yup.string().required('Enter a Town or City'),
        country: Yup.string().required('Enter a Country'),
      })}
    >
      {({
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
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
            {Object.keys(formFieldSchema).map((field) => (
              <div
                key={field}
                className={`${
                  field === 'postcode'
                    ? styles.form_field_variant
                    : styles.form_field
                } ${sansLight.className}`}
              >
                <div>
                  <label htmlFor={field}>
                    {touched[field] && errors[field] ? errors[field] : field}
                  </label>
                  <Field
                    validate={field === 'postcode' && validatePostcode}
                    name={field}
                    id={field}
                    onBlur={() => setFieldTouched(field, true)}
                    onChange={(e) => {
                      setFieldValue(
                        e.currentTarget.name,
                        e.currentTarget.value
                      );
                    }}
                  />
                </div>
                {field === 'postcode' && (
                  <div>
                    <Button
                      text="Find Address"
                      onClick={() => validateField('postcode')}
                      type="button"
                      disabled={false /* TODO */}
                    />
                  </div>
                )}
              </div>
            ))}

            {listOfAddresses.length >= 1 && (
              <div className={`${sansRegular.className} ${styles.addressBox}`}>
                {listOfAddresses.length >= 1 && (
                  <>
                    <div className={styles.addressBox_info}>
                      Addresses Found: {listOfAddresses.length}
                      <span>Postcode: {values.postcode}</span>
                    </div>
                    <ul>
                      {listOfAddresses.map((item, idx) => (
                        <li
                          key={idx}
                          className={sansRegular.className}
                          onClick={(e) => handleAddressItem(e, setFieldValue)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignupForm;
