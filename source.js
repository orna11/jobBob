import { showFavourites } from "./screens/favourites.js";
import { showAll } from "./screens/alljobs.js";
import { showSearchResults } from "./screens/searched.js";
import { Job } from "./models/job.js";

const categories_link = document.querySelector("#categories_link");
const search_form = document.querySelector("#search_form");
const all_link = document.querySelector("#all_link");
const jobs_container = document.querySelector("#jobs_container");
const show_favourites = document.querySelector("#show_favourites");
const tags_container = document.querySelector(".tags_container");
const search_btn = document.querySelector("#search_btn");
const categories_container = document.querySelector("#categories_container");
const main_header = document.querySelector("#main_header");
const menu_icon = document.querySelector("#menu_icon");
const phone_menu = document.querySelector("#phone_menu");

menu_icon.addEventListener("click", () => {
    phone_menu.classList.toggle("invisible");
    phone_menu.classList.toggle("show");
})


const favourites = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : [];

logo.addEventListener("click", () => {
    location.reload();
})

async function showCategories() {
  try {
  const response = await fetch(
    "https://remotive.com/api/remote-jobs/categories"
  );
  const categories0 = await response.json();
  const categories = categories0.jobs;

  for (const cat of categories) {
    const row = document.createElement("div");
    row.style = "display: flex; justify-content: space-between;";
    const category = document.createTextNode(cat.name);
    const bold = document.createElement("b");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("data-id", cat.id);
    checkbox.className = "checkbox";
    bold.append(category);
    row.append(bold, checkbox);
    categories_container.append(row);
  }

  const x = document.createElement("img");
  x.setAttribute("src", "./assets/icons/img_59930.png");
  x.setAttribute("id", "x");
  categories_container.append(x);
  search_form.append(categories_container);

  x.addEventListener("click", () => {
    categories_container.style = "display: none";
  });

  const checkboxes = document.querySelectorAll(".checkbox");
  const checked = [];
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", async () => {
      const id = checkbox.dataset.id;
      const category_obj = categories.filter((category) => {
        return category.id == id;
      });
      const name = category_obj[0].name;

      const jobs0 = await fetch(
        `https://remotive.com/api/remote-jobs?category=${name}`
      );
      const jobs1 = await jobs0.json();
      const jobs = jobs1.jobs;

      const tag = document.querySelector(
        `span[data-id="${checkbox.dataset.id}"]`
      );
      tag.classList.toggle("visibility");

      if (checked.length == 0) {
        jobs_container.textContent = "";
      }

      if (checkbox.checked == 1) {
        checked.push(true);

        for (const jo of jobs) {
          const job = new Job(
            jo.candidate_required_location,
            jo.category,
            jo.company_name,
            jo.description,
            jo.id,
            jo.job_type,
            jo.publication_date,
            jo.salary,
            jo.title,
            jo.url
          );
          job.display(job, favourites);
        }
      } else {
        checked.pop();

        for (const jo of jobs) {
          const job = new Job(
            jo.candidate_required_location,
            jo.category,
            jo.company_name,
            jo.description,
            jo.id,
            jo.job_type,
            jo.publication_date,
            jo.salary,
            jo.title,
            jo.url
          );
          job.remove(job);
        }
      }
    });
  });
} catch(err) {
  console.log(err);
}
}

showCategories();

categories_link.addEventListener("click", async () => {
  const div = document.querySelector("#categories_container");
  div.style = "display: block";
});

all_link.addEventListener("click", async () => {
  try {
    jobs_container.textContent = "";
    showAll();
  } catch(err) {
    console.log(err);
  }

});

show_favourites.addEventListener("click", () => {
  try {
    jobs_container.textContent = "";
    showFavourites();
  } catch(err) {
    console.log(err);
  }

});

search_btn.addEventListener("click", async (e) => {
  e.preventDefault()
  try {
    jobs_container.textContent = "";
    showSearchResults();
  } catch(err) {
    console.log(err);
  }
});
