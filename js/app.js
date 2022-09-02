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

  //   console.log(categoryId);

  fetch(url)
    .then((ref) => ref.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error));
};

const displayNews = (newses) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

//   no news message
    // const noNews = document.getElementById('no-news-message');
    // if(newses.length === 0) {
    //     noNews.classList.remove('d-none')
    // } else {
    //     noNews.classList.add('d-none')
    // }

  newses.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
        <div class="flex items-center p-5 mt-7" onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
        <img src="${news.thumbnail_url}" alt="">
        <div class="p-5">
            <div class="content-area">
                <h3 class="text-2xl font-bold mb-5">${news.title}</h3>
                <p>${news.details.slice(0, 600)}....</p>
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
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const  data = await res.json();
    displayNewsDetails(data);
}

const displayNewsDetails = news => {
    console.log(news)
    const modalTitle = document.getElementById("newsDetalModalLabel");
    modalTitle.innerText = news.name;
    const newsDetails = document.getElementById("news-details");
    newsDetails.innerHTML = `
    <p>Title: ${
      news.title ? news.title : "No Title Found"
    }</p>
    <p>Storage: ${
        news.mainFeatures ? news.mainFeatures.storage : "No Storage Information"
    }</p>
    <p>Bluetooth: ${
        news.others ? news.others.Bluetooth : "No Bluetooth Information"
    }</p>
  `;
}
// loadNewsDetails()
// onclick="loadNewsDetails('${news._id}')"

// loadNews("02");

loadCategories();
