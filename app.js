const container = document.getElementById("container");
const form = document.getElementById("form");
const input = document.querySelector("input");

function getPlaceholerData() {
    // structure of data -> const arr [{}, {}, {}]
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => showPlaceholerData(data));
}

getPlaceholerData();

function showPlaceholerData(data) {
    data.forEach((item) => {
        const { title, body } = item;
        container.innerHTML += `<div class="post">
            <h1>${title}</h1>
            <p>${body}</p>
        </div>`;
    });
}

function getRandomUser() {
    // structure of data -> const obj = {
    //     info: {},
    //     results: [{}],
    // };
    fetch("https://randomuser.me/api/?results=5&gender=female")
        .then((res) => res.json())
        .then((data) => showRandomUser(data.results));
}
getRandomUser();

function showRandomUser(data) {
    console.log(data);
    data.forEach((user) => {
        container.innerHTML += `<div>
            <h1>Name: ${user.name.title} ${user.name.first} ${user.name.last}</h1>
            <h2>Gender: ${user.gender}</h2>
            <h3>Email: ${user.email}</h3>
            <img src="${user.picture.large}" />
        </div>`;
    });
}

let news = [];

function getNews() {
    const url =
        "https://newsapi.org/v2/everything?q=tesla&from=2021-07-29&sortBy=publishedAt&apiKey=5823f0d0254f4a68ac41c11a7d7f9b3c";
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            news = data.articles;
            showNews();
        });
}
getNews();

function showNews() {
    console.log(news);
    news.forEach((n) => {
        container.innerHTML += `<div>
            <h1>${n.title}</h1>
            <p>${n.author}</p>
        </div>`;
    });
}

function getMeal(name) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showMeal(data.meals));
}

function showMeal(meals) {
    container.innerHTML = "";
    meals.forEach((meal) => {
        container.innerHTML += `<div class="card col-md-4" style="width: 18rem;">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions}</p>
        </div>
      </div>`;
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getMeal(input.value);
});
