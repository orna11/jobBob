import { Job } from "../models/job.js";

export async function showSearchResults() {
  const favourites = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : [];
  const response = await fetch(
    "https://remotive.com/api/remote-jobs?limit=200"
  );
  const jobs0 = await response.json();
  const jobs = jobs0.jobs;
  const categories = [];

  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((box) => {
    if (box.checked == 1) {
      categories.push(parseInt(box.dataset.id));
    }
  });

  const search_field = document.querySelector("#search_field").value;
  const searched = jobs.filter((jo) => {
    return (
      jo.category.toLowerCase().includes(search_field.toLowerCase()) ||
      jo.title.toLowerCase().includes(search_field.toLowerCase()) ||
      jo.description.toLowerCase().includes(search_field.toLowerCase()) ||
      jo.company_name.toLowerCase().includes(search_field.toLowerCase())
    );
  });

  if (categories.length == 0) {
    for (const jo of searched) {
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
    const response = await fetch(
      "https://remotive.com/api/remote-jobs/categories"
    );
    const categories0 = await response.json();
    const all_categories = categories0.jobs;
    const selected = all_categories.filter((category) => {
      return categories.includes(category.id);
    });
    const names = [];
    for (const job of selected) {
      names.push(job.name.toLowerCase());
    }

    const filtered = searched.filter((jo) => {
      return names.includes(jo.category.toLowerCase());
    });
    const favourites = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : [];

    for (const jo of filtered) {
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
  }
}
