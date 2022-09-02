const loadCategories = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;

  fetch(url)
    .then((ref) => ref.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("display-categories");
  categories.forEach((category) => {
    const categoryLi = document.createElement("li");
    categoryLi.innerHTML = `            
                <li onclick="loadNews('${category.category_id}')"
                    class="text-lg py-1 px-2.5 cursor-pointer text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded">
                    ${category.category_name}
                </li>
            `;
    categoriesContainer.appendChild(categoryLi);
  });
};

loadCategories();

const loadNews = (categoryName) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryName}`;

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
            <div class="author-area mt-4 flex items-center">
                <img class="rounded-full w-8" src="${news.author.img}" alt="">
                <div class="ml-3">
                    <h4>${news.author.name}</h4>
                    <p>${news.author.published_date}</p>
                </div>
            </div>
        </div>
    </div>
        `;
    newsContainer.appendChild(newsDiv);
  });
};

// loadNews();
