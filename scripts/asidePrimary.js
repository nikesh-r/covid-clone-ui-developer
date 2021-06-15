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

startPrimaryAside();
