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
          loading="lazy"
          class="live-news-item--bg-img"
        />
        <img
          src="./res/assets_UI_3/play-button-1.svg"
          alt="play-button"
          loading="lazy"
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

startLiveNews();
