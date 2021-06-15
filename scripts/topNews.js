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

startTopNews();
