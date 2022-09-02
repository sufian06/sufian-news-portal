const loadCategories = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;

  fetch(url)
    .then((ref) => ref.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));

  const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("display-categories");
    categories.forEach((category) => {
      const categoryLi = document.createElement("li");
      categoryLi.innerHTML = `            
                <li
                    class="text-lg py-1 px-2.5 cursor-pointer text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded">
                    ${category.category_name}
                </li>
            `;
      categoriesContainer.appendChild(categoryLi);
    });
  };
};

loadCategories();
