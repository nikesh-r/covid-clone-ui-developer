// ADD COVID UPDATE DATA

const fetchCountryData = async () => {
  const dataCountries = await fetch("./data/countries.json");
  const countryJson = await dataCountries.json();
  // console.log(countryJson);
  return countryJson;
};

const fetchStateData = async (countryValue) => {
  const dataStates = await fetch(
    `https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json?country=${countryValue}`
  );
  const stateJson = await dataStates.json();
  // console.log(stateJson);
  return stateJson;
};

const fetchCovidData = async (selectedState) => {
  const dataCovid = await fetch("./data/COVID_US_MAP_DATA.json");
  const covidJson = await dataCovid.json();
  // console.log(selectedState);
  const matchingState = covidJson.US_MAP_DATA.find(
    (state) => state.abbr === selectedState
  );
  if (matchingState) {
    const selectedStateCovidData = {
      totalCases: matchingState.tot_cases,
      totalRecoveredCases: matchingState.new_cases07,
      totalDeaths: matchingState.tot_death,
    };
    return selectedStateCovidData;
  } else {
    const defaultStateCovidData = {
      totalCases: "NA",
      totalRecoveredCases: "NA",
      totalDeaths: "NA",
    };
    return defaultStateCovidData;
  }
};

const populateCountryList = (countryData) => {
  const countrySelectElement = document.querySelector(".country-list");
  countryData.forEach((element) => {
    const optionElement = document.createElement("option");
    optionElement.value = element.code;
    optionElement.innerHTML = element.name;
    // if (element.code === "US") optionElement.setAttribute("selected", "");
    countrySelectElement.appendChild(optionElement);
  });
  addCountryChangeListener();
};

const setDefaultCountry = async (countryName = "US") => {
  const countrySelectElement = document.querySelector(".country-list");
  countrySelectElement.value = countryName;
};

const setDefaultState = async (countryName = "US") => {
  const stateData = await fetchStateData(countryName);
  populateStateList(stateData);
};

const setDefaultCovidData = async (stateName = "AL") => {
  const defualtStateCovidData = await fetchCovidData(stateName);
  populateCovidData(defualtStateCovidData);
};

const addCountryChangeListener = () => {
  document
    .querySelector(".country-list")
    .addEventListener("change", handleCountryChange);
};

const handleCountryChange = async (e) => {
  if (!e) return;
  const selectedCountry = e.target.selectedOptions[0].text;
  const countryValue = e.target.value;
  // console.log(selectedCountry);
  // console.log(countryValue);
  const stateData = await fetchStateData(countryValue);
  populateStateList(stateData);
};

const populateStateList = (stateData) => {
  const stateSelectElement = document.querySelector(".state-list");
  stateData.forEach((element) => {
    const optionElement = document.createElement("option");
    optionElement.value = element.abbreviation;
    optionElement.innerHTML = element.name;
    stateSelectElement.appendChild(optionElement);
  });
  addStateChangeListener();
};

const addStateChangeListener = () => {
  document
    .querySelector(".state-list")
    .addEventListener("change", handleStateChange);
};

const handleStateChange = async (e) => {
  if (!e) return;
  const selectedState = e.target.value;
  const matchingStateCovidData = await fetchCovidData(selectedState);
  // console.log(matchingStateCovidData);
  populateCovidData(matchingStateCovidData);
};

const populateCovidData = (matchingStateCovidData) => {
  const totalCasesNum = document.querySelector(".total-cases-num");
  const recoveredCasesNum = document.querySelector(".recovered-cases-num");
  const deathsNum = document.querySelector(".deaths-num");
  totalCasesNum.innerHTML = formatData(matchingStateCovidData.totalCases);
  recoveredCasesNum.innerHTML = formatData(
    matchingStateCovidData.totalRecoveredCases
  );
  deathsNum.innerHTML = formatData(matchingStateCovidData.totalDeaths);
};

const formatData = (value) => {
  if (value === "NA") return value;
  const nf = new Intl.NumberFormat();
  return nf.format(value);
};

const initialiseDefaultData = async () => {
  const defaultCountry = "US";
  const defaultState = "AL";
  await setDefaultCountry(defaultCountry);
  await setDefaultState(defaultCountry);
  await setDefaultCovidData(defaultState);
};

const startCovidUpdates = async () => {
  const countryData = await fetchCountryData();
  populateCountryList(countryData);
  await handleCountryChange();
  await handleStateChange();
  await initialiseDefaultData();

  // const stateData = fetchStateData();
  // const covidData = fetchCovidData();
};

startCovidUpdates();
