const loadNews = () => {
  const url = `https://openapi.programming-hero.com/api/news/category/01`;

  fetch(url)
    .then((ref) => ref.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error));
};

const displayNews = (newses) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  newses.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
        <div class="flex p-5 mt-7">
        <img class="h-72 w-60 rounded-lg" src="${news.image_url}" alt="">
        <div class="p-5">
            <div class="content-area">
                <h3 class="text-2xl font-bold mb-2">${news.title}</h3>
                <p>${news.details}</p>
            </div>
            <div class="author-area"></div>
        </div>
    </div>
        `;
    newsContainer.appendChild(newsDiv);
  });
};

loadNews();
