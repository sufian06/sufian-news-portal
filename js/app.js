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

const loadNews = (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  toggleSpinner(true);

  fetch(url)
    .then((ref) => ref.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error));
};

const displayNews = (newses) => {
  // console.log(newses)
  // const noNewsMessage = document.getElementById("no-news-message");
  // if (newses.length === 0) {
  //   noNewsMessage.classList.remove("d-none");
  // } else {
  //   noNewsMessage.classList.add("d-none");
  // }

  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  // news sorting
  newses.sort((a, b) => {
    return b.total_view - a.total_view;
  });

  // console.log(newses)

  const newsItem = document.getElementById("category-items");

  if (newses.length !== 0) {
    newsItem.innerText = newses.length;
  } else {
    newsItem.innerText = "data not available";
  }

  newses.forEach((news) => {
    // console.log(news)

    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
        <div class="flex bg-white rounded-lg flex-col lg:flex-row items-center p-4 lg:p-5 mt-7" onclick="loadNewsDetails('${
          news._id
        }')" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
        <img src="${news.thumbnail_url}" alt="">
        <div class="lg:p-5">
            <div class="content-area mt-2 lg:mt-0">
                <h3 class="text-2xl font-bold mb-2 lg:mb-5">${news.title}</h3>
                <p>${news.details.slice(0, 300)}....</p>
            </div>
            <div class="mt-8 flex justify-between items-center">
                <div class="author-area flex items-center">
                    <img class="rounded-full w-8" src="${
                      news.author.img
                    }" alt="">
                    <div class="ml-3">
                        <h4>${
                          news.author.name ? news.author.name : "No Data Found"
                        }</h4>
                        <p>${
                          news.author.published_date
                            ? news.author.published_date
                            : "No Data Found"
                        }</p>
                        
                    </div>
                </div>
                <div>
                    <i class="fa-regular fa-eye"></i>
                    <span class="font-bold">${
                      news.total_view ? news.total_view : "No Data Available"
                    }</span>
                </div>
                <div>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
           
                </div>
                <div class="text-blue-600">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        </div>
    </div>
        `;
    newsContainer.appendChild(newsDiv);

    toggleSpinner(false);
  });
};

// loader
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

const loadNewsDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsDetails(data.data[0]);
};

const displayNewsDetails = (news) => {
  // console.log(news);
  const modalTitle = document.getElementById("newsDetailModalLabel");
  modalTitle.innerText = news.title;
  const newsDetails = document.getElementById("news-details");
  newsDetails.innerHTML = `
    <img src="${news.image_url ? news.image_url : "no data found"}" alt="">
    <p class="mt-4">Details: ${
      news.details ? news.details : "No details Found"
    }</p>
    <div class="author-area flex items-center mt-4">
      <img class="rounded-full w-8" src="${news.author.img}" alt="">
      <div class="ml-3">
          <h4>${news.author.name ? news.author.name : "No Data Found"}</h4>
          <p>${
            news.author.published_date
              ? news.author.published_date
              : "No Data Found"
          }</p>
          
      </div>
  </div>
    
  `;
};

loadCategories();
