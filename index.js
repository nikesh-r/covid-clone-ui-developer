//  ADD PRIMARY ASIDE DATA FROM JSON
const fetchPrimaryAsideData = async () => {
  const jsonPrimaryAside = await fetch("./data/asidePrimary.json");
  let dataPA = await jsonPrimaryAside.json();
  dataPA = dataPA.primaryAside;
  // console.log(dataPA);
  return dataPA;
};

const addPrimaryAsideItem = (data) => {
  const primaryAsideElement = document.querySelector(".article-primary-items");
  // console.log(data);
  data.forEach((datum) => {
    const htmlTag = `<a class="article-primary-item border-top" href="${datum.anchorLink}"><img src="${datum.imgSrc}" alt="${datum.imgAlt}" class="article-primary-item--img" /><p class="article-primary-item--desc text-overflow-2-lines">${datum.description}</p></a>`;
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
  let dataSA = await jsonSecondaryAside.json();
  dataSA = dataSA.secondaryAside;
  // console.log(dataSA);
  return dataSA;
};

const addSecondaryAsideItem = (data) => {
  const secondaryAsideElement = document.querySelector(
    ".article-secondary-items"
  );
  // console.log(data);
  data.forEach((datum) => {
    const htmlTag = `<a class="article-secondary-item border-top" href="${datum.anchorLink}"><p class="article-secondary-item--desc">${datum.pDescription}<span>${datum.spanDescription}</span></p><img	src="${datum.imgSrc}"	alt="${datum.imgAlt}" class="article-secondary-item--img"	/></a>`;
    // console.log(htmlTag);
    secondaryAsideElement.innerHTML += htmlTag;
  });
};

const startSecondaryAside = async () => {
  const secondaryAsideData = await fetchSecondaryAsideData();
  addSecondaryAsideItem(secondaryAsideData);
};

startPrimaryAside();
startSecondaryAside();
