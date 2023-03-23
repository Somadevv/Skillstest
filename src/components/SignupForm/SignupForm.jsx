import { Field, Formik, Form, setFieldValue } from 'formik';
import styles from './signupform.module.scss';
import localFont from 'next/font/local';
import Button from '../Button/Button';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useState } from 'react';
import Image from 'next/image';
import showIcon from '../../../public/images/icons/show.svg';
import hideIcon from '../../../public/images/icons/hide.svg';
import Link from 'next/link';
const sansRegular = localFont({
  src: '../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Regular.ttf',
});

const sansLight = localFont({
  src: '../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Light.ttf',
});
const sansBold = localFont({
  src: '../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Bold.ttf',
});

const SignupForm = () => {
  const [listOfAddresses, setListOfAddresses] = useState({});
  const [postcode, setPostcode] = useState('');
  const [enableManualAddress, setEnableManualAddress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };
  const fieldTypes = {
    email: 'email',
    text: 'text',
    password: 'password',
  };

  const formFieldSchema = {
    email: { label: 'Email', value: '', type: fieldTypes.email },
    password: { label: 'Password', value: '', type: fieldTypes.password },
    confirmPassword: {
      label: 'Confirm Password',
      value: '',
      type: fieldTypes.password,
    },
    firstName: { label: 'First Name', value: '', type: fieldTypes.text },
    lastName: { label: 'Last Name', value: '', type: fieldTypes.text },
    addressLine1: { label: 'Address Line 1', value: '', type: fieldTypes.text },
    addressLine2: {
      label: 'Address Line 2 (optional)',
      value: '',
      type: fieldTypes.text,
    },
    addressLine3: {
      label: 'Address Line 3 (optional)',
      value: '',
      type: fieldTypes.text,
    },
    townOrCity: { label: 'Town or City', value: '', type: fieldTypes.text },
    country: { label: 'Country', value: '', type: fieldTypes.text },
    postcode: { label: 'Postcode', value: '', type: fieldTypes.text },
  };
  // Reduce formFieldSchema to key: value
  const formInitialValues = Object.keys(formFieldSchema).reduce((acc, key) => {
    acc[key] = formFieldSchema[key].value || '';
    return acc;
  }, {});

  const reducer = (acc, key) => {
    acc[key] = formInitialValues[key].value || '';
    return acc;
  };

  // Rendered form fields if manual address == false
  const formPrimarySection = [
    'email',
    'password',
    'confirmPassword',
    'firstName',
    'lastName',
    'postcode',
  ].reduce(reducer, {});

  // Handle address box list items
  const handleAddressItem = (e, setFieldValue) => {
    const addressParts = e.currentTarget.innerHTML.split(', ').map(parse);
    const [addressLine1, townOrCity, country] = addressParts;
    setFieldValue('addressLine1', parse(addressLine1));
    setFieldValue('townOrCity', parse(townOrCity));
    setFieldValue('country', parse(country));

    // TODO close address list box
    setListOfAddresses({});
    setEnableManualAddress(true);
  };

  const fetchPostcode = async (postcode) => {
    // const response = await fetch(
    //   `https://api.getAddress.io/find/${postcode}?api-key=${process.env.NEXT_PUBLIC_API_KEY}`
    // );
    // const postcodeData = await response.json();

    // if (postcodeData?.addresses?.length < 1) {
    //   throw new RangeError('No addresses were found for the given postcode');
    // }

    // const formattedAddresses = postcodeData.addresses.map((address) => {
    //   const addressParts = address.split(', ').filter(Boolean);
    //   addressParts.push(postcode.toUpperCase());

    //   return addressParts.join(', ');
    // });
    // console.log(formattedAddresses);
    setListOfAddresses([
      '51 High Street, Penzance, Cornwall, TR18 2SU',
      '51a High Street, Penzance, Cornwall, TR18 2SU',
      '52 High Street, Penzance, Cornwall, TR18 2SU',
      '53 High Street, Penzance, Cornwall, TR18 2SU',
      '54 High Street, Penzance, Cornwall, TR18 2SU',
    ]);
  };

  // TODO: Validate postcode

  const validatePostcode = (postcode) => {
    let error;
    const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]? [0-9][A-Z]{2}$/;

    if (!postcodeRegex.test(postcode)) {
      error = 'Invalid UK postcode';
    } else {
      setPostcode(postcode);
    }

    return error;
  };

  const handleFindAddress = () => {
    if (postcode.length > 1) {
      fetchPostcode(postcode);
    } else {
      console.log('invalid!');
    }
  };

  const handleFormSubmission = (e) => {
    // if (Object.keys(e).length >= 1) {
    //   setPushErrorMessage(true);
    // } else {
    //   setPushErrorMessage(false);
    //   router.push('/signup-success');
    // }
  };

  // Control field types
  const getInputFieldType = (field) => {
    const fieldType = formFieldSchema[field]?.type;
    if (fieldType === 'password' && showPassword) {
      return 'text';
    }

    return fieldType || 'text';
  };

  // Generate form sections (state dependant)
  const formToRender = !enableManualAddress
    ? formPrimarySection
    : formInitialValues;

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
        validateForm,
      }) => (
        <div className={styles.component}>
          {/* Form Create your Account into */}
          <div className={styles.form_intro}>
            <h3 className={sansRegular.className}>Create your Account</h3>
            <p className={sansLight.className}>
              In 30 seconds you&#39;ll be a sign up pro!
            </p>
          </div>
          {/* Main form */}
          <Form className={styles.form}>
            {Object.keys(formToRender).map((field) => (
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
                    {touched[field] && errors[field] ? (
                      <p className={`${sansLight.className} errorLabel`}>
                        {errors[field]}
                      </p>
                    ) : (
                      formFieldSchema[field].label
                    )}
                  </label>
                  <Field
                    validate={field === 'postcode' && validatePostcode}
                    name={field}
                    id={field}
                    className={
                      touched[field] && errors[field] ? 'errorField' : ''
                    }
                    type={getInputFieldType(formFieldSchema[field].type)}
                    onBlur={() => setFieldTouched(field, true)}
                    onChange={(e) => {
                      setFieldValue(
                        e.currentTarget.name,
                        e.currentTarget.value
                      );
                    }}
                  />
                  {formFieldSchema[field].type === 'password' && (
                    <Image
                      className={styles.icon}
                      src={showPassword ? showIcon : hideIcon}
                      alt=""
                      onClick={handlePasswordVisiblity}
                      width={15}
                      height={15}
                    />
                  )}
                </div>
                {field === 'postcode' && (
                  <div>
                    <Button
                      text="Find Address"
                      onClick={() => {
                        validateField('postcode');
                        handleFindAddress();
                      }}
                      type="button"
                      disabled={false /* TODO */}
                    />
                  </div>
                )}
              </div>
            ))}

            <div className={styles.form_field}>
              <button
                className={`${styles.enterAddressManually} ${sansRegular.className}`}
                onClick={() => setEnableManualAddress(!enableManualAddress)}
                type="button"
              >
                {enableManualAddress
                  ? 'Hide address details'
                  : 'Enter address manually'}
              </button>
            </div>

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
            {Object.keys(errors).length > 0 && (
              <div
                className={`${styles.errorMessage} ${sansRegular.className}`}
              >
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
            <div className={styles.form_signIn_prompt}>
              <p className={sansRegular.className}>
                Already signed in?
                <Link
                  href="/"
                  className={`${sansBold.className} hightlight-pink`}
                >
                  &nbsp;Login
                </Link>
              </p>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignupForm;
