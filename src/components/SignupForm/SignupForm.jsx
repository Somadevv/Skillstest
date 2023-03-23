import { Field, Formik, Form } from 'formik';
import styles from './signupform.module.scss';
import localFont from 'next/font/local';
import Button from '../Button/Button';
import Container from '../Container/Container';
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
  const router = useRouter();
  const [listOfAddresses, setListOfAddresses] = useState({});
  const [postcode, setPostcode] = useState('');
  const [enableManualAddress, setEnableManualAddress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [findAddressButtonState, setFindAddressButtonState] = useState(false);

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

  // Handle find address onclick
  const handleFindAddress = () => {
    if (postcode.length > 1) {
      fetchPostcode(postcode);
    } else {
      console.log('invalid!');
    }
  };

  // Handle address box list items
  const handleAddressItem = (e, setFieldValue) => {
    const addressParts = e.currentTarget.innerHTML.split(', ').map(parse);
    console.log(addressParts);
    const [addressLine1, townOrCity, country] = addressParts;
    setFieldValue('addressLine1', parse(addressLine1));
    setFieldValue('townOrCity', parse(townOrCity));
    setFieldValue('country', parse(country));
    setFindAddressButtonState(true);
    setListOfAddresses({});
    setEnableManualAddress(true);
  };

  const fetchPostcode = async (postcode) => {
    const response = await fetch(
      `https://api.ideal-postcodes.co.uk/v1/postcodes/${postcode}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const postcodeData = await response.json();
    if (postcodeData?.result?.length < 1) {
      throw new RangeError('No addresses were found for the given postcode');
    }
    const formattedAddresses = postcodeData.result.map((address) => {
      return `${address.line_1}, ${address.post_town}, ${address.country}`;
    });
    setListOfAddresses(formattedAddresses);
  };

  // Validate postcode
  const validatePostcode = (postcode) => {
    let error;
    const postcodeRegex =
      /^[a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]?\s?[0-9][a-zA-Z]{2}$/i;

    if (!postcodeRegex.test(postcode)) {
      error = 'Invalid UK postcode';
    } else {
      setPostcode(postcode);
    }

    return error;
  };

  const handleFormSubmission = (e, email) => {
    if (!Object.keys(e).length >= 1) {
      router.push({
        pathname: '/signup-success',
        query: { email: email },
      });
    }
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
        <Container type="content_sm" className={styles.component}>
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
                        if (e.currentTarget.name === 'postcode') {
                          const uppercaseValue =
                            e.currentTarget.value.toUpperCase();
                          setFieldValue('postcode', uppercaseValue);
                        }
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
                    <div className={styles.findAddress}>
                      <Button
                        text="Find Address"
                        onClick={() => {
                          validateField('postcode');
                          handleFindAddress();
                        }}
                        type="button"
                        disabled={findAddressButtonState}
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

              {listOfAddresses?.length >= 1 && (
                <div
                  className={`${sansRegular.className} ${styles.addressBox}`}
                >
                  {listOfAddresses.length >= 1 && (
                    <>
                      <div className={styles.addressBox_info}>
                        <p style={{ margin: 0 }}>
                          Addresses found&nbsp;
                          <span className="hightlight-pink">
                            {listOfAddresses.length}
                          </span>
                        </p>
                        <p style={{ margin: 0 }}>
                          Postcode&nbsp;
                          <span className="hightlight-pink">
                            {values.postcode.toUpperCase()}
                          </span>
                        </p>
                      </div>
                      <ul>
                        {listOfAddresses.map((address, idx) => (
                          <li
                            key={idx}
                            className={sansRegular.className}
                            onClick={(e) => handleAddressItem(e, setFieldValue)}
                          >
                            {address}
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
                  validateForm().then((e) =>
                    handleFormSubmission(e, values.email)
                  )
                }
                className={styles.signupButton}
              />
              <div className="signin_prompt">
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
        </Container>
      )}
    </Formik>
  );
};

export default SignupForm;
