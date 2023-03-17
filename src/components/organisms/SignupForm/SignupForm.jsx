import styles from './signupform.module.scss';
import data from '../../../../data/forms/signup.json';
import Container from '../../common/Container/Container';
import Button from '../../atoms/Button/Button';
import localFont from 'next/font/local';
import { useState } from 'react';
import { useRouter } from 'next/router';

const sansLight = localFont({
  src: '../../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Light.ttf',
});
const sansRegular = localFont({
  src: '../../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Regular.ttf',
});
const sansPro = localFont({
  src: '../../../../public/fonts/Soure_Sans_Pro/SourceSansPro-ExtraLight.ttf',
});

const SignupForm = () => {
  const router = useRouter();
  const [manaualAddress, setManualAddress] = useState(false);
  const [findAddress, setFindAddress] = useState(false);
  const [sortedAddressList, setSortedAddressList] = useState({});
  const [enteredPostcode, setEnteredPostcode] = useState('tr38');
  const [primaryFields, setPrimaryFields] = useState(generateInitialState());

  function generateInitialState() {
    const inputFields = {};
    data.secondary.forEach((field) => {
      inputFields[field.name] = '';
    });
    return inputFields;
  }
  // Handle form submission
  const handleSubmission = () => {
    router.push('/signup-success');
  };
  // Handle address box list items
  const handleAddressItem = (e) => {
    const clickedFieldValue = e.currentTarget.innerHTML.split(', ');
    setPrimaryFields({
      ...primaryFields,
      address1: clickedFieldValue[0],
      town: clickedFieldValue[1],
      country: clickedFieldValue[2],
    });
    setManualAddress(true);
    setFindAddress(false);
  };
  const handleFindAddress = () => {
    setFindAddress(!findAddress);
    formatAddresses({
      latitude: 50.120129104761915,
      longitude: -5.538047214285713,
      addresses: [
        '51 High Street, , , , , Penzance, Cornwall',
        '51a High Street, , , , , Penzance, Cornwall',
        '52 High Street, , , , , Penzance, Cornwall',
        '53 High Street, , , , , Penzance, Cornwall',
        '54 High Street, , , , , Penzance, Cornwall',
      ],
    });
  };

  const updateInput = (e) => {
    const { name, value } = e.currentTarget;
    setPrimaryFields({
      ...primaryFields,
      [name]: value,
    });
  };

  const fetchPostcode = (e, query) => {
    e.preventDefault();
    // // Fetch postcode with postcode as parameter
    // fetch(
    //   `https://api.getAddress.io/find/${query}?api-key=E3xORYQPREypqwsbh1-6_w38866`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // setEnteredPostcode(formatAddress(data));

    //     // setLoading(false);
    //     console.log(enteredPostcode);
    //   });
  };
  const formatAddresses = (address) => {
    try {
      let formattedAddress = Object.values(address.addresses).map((address) => {
        let x = address.split(', ').filter(Boolean).join(', ');
        x += `, ${enteredPostcode.toUpperCase()}`;
        return x;
      });
      setSortedAddressList(formattedAddress);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container type="content_sm" className={styles.component}>
      <div className={styles.form_intro}>
        <h3 className={sansRegular.className}>Create your Account</h3>
        <p className={sansLight.className}>
          In 30 seconds you&#39;ll be a sign up pro!
        </p>
      </div>
      <form method="post" className={styles.form}>
        {/* Main form */}
        {data &&
          data.primary.map((field, idx) =>
            !field.buttonLayout ? (
              <div key={idx} className={styles.form_field}>
                {field.label && (
                  <label htmlFor={field.name} className={sansLight.className}>
                    {field.label}
                  </label>
                )}
                <input type={field.type} className={sansRegular.className} />
              </div>
            ) : (
              <>
                {/* Manual address sub-form */}
                {manaualAddress && (
                  <div className={styles.form_manualAddress}>
                    {data &&
                      data.secondary.map((field, idx) => {
                        return (
                          <div key={idx} className={styles.form_field}>
                            {field.label && (
                              <label
                                htmlFor={field.name}
                                className={sansLight.className}
                              >
                                {field.label}
                              </label>
                            )}
                            <input
                              name={field.name}
                              type={field.type}
                              className={sansRegular.className}
                              onChange={updateInput}
                              value={primaryFields[field.name]}
                            />
                          </div>
                        );
                      })}
                  </div>
                )}
                <div key={idx} className={styles.form_field_variant}>
                  <div>
                    {field.label && (
                      <label
                        htmlFor={field.name}
                        className={sansLight.className}
                      >
                        {field.label}
                      </label>
                    )}
                    <input
                      type={field.type}
                      className={sansRegular.className}
                    />
                  </div>

                  <Button
                    text="Find Address"
                    onClick={handleFindAddress}
                    type="button"
                    disabled={manaualAddress}
                  />
                </div>
              </>
            )
          )}
        <button
          className={`${styles.enterAdressManually} ${sansRegular.className}`}
          onClick={() => setManualAddress(!manaualAddress)}
          type="button"
        >
          Enter address manually
        </button>

        {findAddress && (
          <div className={styles.addressBox}>
            {sortedAddressList.length >= 1 && (
              <ul>
                {sortedAddressList.map((item, idx) => (
                  <li
                    key={idx}
                    className={sansRegular.className}
                    onClick={(e) => handleAddressItem(e)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <Button text="Sign Up" onClick={handleSubmission} type="button" />
      </form>
    </Container>
  );
};

export default SignupForm;
