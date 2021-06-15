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
        loading="lazy"
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

startSecondaryAside();
