import countries from 'world-countries';

// a custom hook useCountries that returns an object with two functions: getAll and getByValue.
// getAll: This function returns all the formatted countries. It simply returns the formattedCountries array.
// getByValue: This function takes a value parameter and returns the country object from formattedCountries 

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCountries;
