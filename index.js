//  ADD PRIMARY ASIDE DATA FROM JSON

const fetchPrimaryAsideData = async () => {
  const jsonPrimaryAside = await fetch("./data/asidePrimary.json");
  const dataPA = await jsonPrimaryAside.json();
  // console.log(dataPA);
  return dataPA.primaryAside;
};

const addPrimaryAsideItem = (data) => {
  const primaryAsideElement = document.querySelector(".article-primary-items");
  // console.log(data);
  data.forEach((datum) => {
    const htmlTag = `<a class="article-primary-item border-top" href="${datum.anchorLink}">
			<img
				src="${datum.imgSrc}"
				alt="${datum.imgAlt}"
				class="article-primary-item--img"
			/>
			<p class="article-primary-item--desc text-overflow-2-lines">
				${datum.description}
			</p>
		</a>`;
    // console.log(htmlTag);
    primaryAsideElement.innerHTML += htmlTag;
  });
};

const startPrimaryAside = async () => {
  const primaryAsideData = await fetchPrimaryAsideData();
  addPrimaryAsideItem(primaryAsideData);
};

//  ADD SECONDARY ASIDE DATA FROM JSON

const fetchSecondaryAsideData = async () => {
  const jsonSecondaryAside = await fetch("./data/asideSecondary.json");
  const dataSA = await jsonSecondaryAside.json();
  // console.log(dataSA);
  return dataSA.secondaryAside;
};

const addSecondaryAsideItem = (data) => {
  const secondaryAsideElement = document.querySelector(
    ".article-secondary-items"
  );
  // console.log(data);
  data.forEach((datum) => {
    const htmlTag = `<a class="article-secondary-item border-top" href="${datum.anchorLink}">
			<p class="article-secondary-item--desc">
				${datum.pDescription}
				<span>${datum.spanDescription}</span>
			</p>
			<img
				src="${datum.imgSrc}"
				alt="${datum.imgAlt}"
				class="article-secondary-item--img"
			/>
		</a>`;
    // console.log(htmlTag);
    secondaryAsideElement.innerHTML += htmlTag;
  });
};

const startSecondaryAside = async () => {
  const secondaryAsideData = await fetchSecondaryAsideData();
  addSecondaryAsideItem(secondaryAsideData);
};

// ADD MAIN - TOP NEWS DATA

const fetchTopNewsAndAdData = async () => {
  const fetchTopNewsData = await fetch("./data/topNews.json");
  const topNewsData = await fetchTopNewsData.json();
  // console.log(topNewsData);
  const fetchAdData = await fetch("./data/adTopNews.json");
  const adData = await fetchAdData.json();
  // console.log(adData);
  addTopNewsItems(topNewsData.topNews, adData.ads);
  // return topNewsData.topNews;
};

const addTopNewsItems = (topNewsData, adData) => {
  const topNewsListElement = document.querySelector(".top-news-items-list");
  const topNewsLength = topNewsData.length;
  let j = 0;
  for (let i = 0; i < topNewsLength; i++) {
    const topNewsItem = getTopNewsItem(topNewsData[i]);
    topNewsListElement.innerHTML += topNewsItem;
    if (i === 4 * j + 1) {
      const adContainer = getAdContainer(adData);
      topNewsListElement.innerHTML += adContainer;
      j++;
    }
  }
};

const getTopNewsItem = (data) => {
  const htmlTag = `<a href="${data.anchorLink}" class="top-news-item">
		<div class="top-news-item--img-box">
			<img
				src="${data.itemImgSrc}"
				alt="${data.itemImgAlt}"
				class="top-news-item--img"
			/>
			<div class="top-news-item--tag-box">
				<h3 class="top-news-item--tag-box--title all-caps">
				${data.tagTitle}
				</h3>
			</div>
		</div>
		<h2 class="top-news-item--heading">
			${data.newsHeading}
		</h2>
		<p class="top-news-item--desc text-overflow-2-lines">
			${data.newsDescription}
		</p>
	</a>`;
  return htmlTag;
};

const getAdContainer = (adData) => {
  let adContainerTag = `<div class="main-ad-container span-grid-item">
		<div class="ad-head border-bottom">
			<h3 class="ad-heading">See More</h3>
		</div>
		<div class="ad-items span-grid-item">`;
  adData.forEach((adDatum) => {
    const adItem = `<a href="${adDatum.anchorLink}" class="ad-item">
			<img
				src="${adDatum.imgSrc}"
				alt="${adDatum.imgAlt}"
				class="ad-item--img"
			/>
			<div class="ad-item--head">
				<p class="ad-item--desc">
					${adDatum.adHeading}
				</p>
				<img
					src="./res/assets_UI_3/path_4.svg"
					alt="right-chevron"
					class="ad-item--right-chev"
				/>
				</div>
			</a>`;
    adContainerTag += adItem;
  });
  // adContainerTag += arr[0];
  // adContainerTag += arr[1];
  const adFooter = `</div>
		<a href="" class="ad-footer">
			<p class="ad-title">ads</p>
		</a>
	</div>`;
  adContainerTag += adFooter;
  // console.log(adContainerTag);
  return adContainerTag;
};

const startTopNews = async () => {
  const data = await fetchTopNewsAndAdData();
  // console.log(data);
};

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

// ADD LIVE NEWS DATA

const fetchLiveNewsData = async () => {
  const data = await fetch("./data/liveNews.json");
  const liveNewsData = await data.json();
  return liveNewsData.liveNews;
};

const addLiveNewsItems = (liveNewsData) => {
  const liveNewsItemsListElement = document.querySelector(
    ".live-news-items-list"
  );
  liveNewsData.forEach((element) => {
    const liveNewsItem = `<div class="live-news-item" data-iframe="${element.videoSrc}">
      <div class="live-news-item--img-box">
        <img
          src="${element.bgImgSrc}"
          alt="${element.bgImgAlt}"
          class="live-news-item--bg-img"
        />
        <img
          src="./res/assets_UI_3/play-button-1.svg"
          alt="play-button"
          class="live-news-item--img-play"
        />
      </div>
      <h3 class="live-news-item--heading">
      ${element.videoHeading}
      </h3>
    </div>`;
    liveNewsItemsListElement.innerHTML += liveNewsItem;
  });
};

const playVideoOnClick = () => {
  const liveNewsItemElement = document.querySelectorAll(".live-news-item");
  liveNewsItemElement.forEach((element) => {
    element.addEventListener("click", videoPlayerHandler, {
      passive: true,
    });
  });
};

const videoPlayerHandler = (e) => {
  const selectedItemVideoSrc = e.currentTarget.dataset.iframe;
  // console.log(selectedItemVideoSrc);
  const selectedItem = document.querySelector(".video-popup");
  // console.log(selectedItem);
  selectedItem.classList.toggle("video-popup--hidden");
  document
    .querySelector(".live-news-item--video")
    .setAttribute("src", selectedItemVideoSrc);
};

const closeVideo = () => {
  // document.querySelector(".live-news-item--video")
  document
    .querySelector(".video-popup")
    .classList.toggle("video-popup--hidden");
};

const startLiveNews = async () => {
  const liveNewsData = await fetchLiveNewsData();
  addLiveNewsItems(liveNewsData);
  playVideoOnClick();
};

// DRIVER FUNCTIONS

startTopNews();
startPrimaryAside();
startSecondaryAside();
startCovidUpdates();
startLiveNews();
