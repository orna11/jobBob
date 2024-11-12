import { Job } from "../models/job.js";

export async function showFavourites() {
  const id_list = JSON.parse(localStorage.getItem("favourites")) ? JSON.parse(localStorage.getItem("favourites")) : [];

  const response = await fetch(
    "https://remotive.com/api/remote-jobs?limit=200"
  );
  const jobs0 = await response.json();
  const jobs = jobs0.jobs;
  const favourites = jobs.filter((job) => {
    return id_list.includes(job.id);
  });

  for (const jo of favourites) {
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

  const hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart) => {
    heart.textContent = "💙Remove";
    heart.removeEventListener("click", () => {
      const favourites = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : [];
      favourites.push(obj.id);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    });
    heart.addEventListener("click", () => {
      const favourites = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : [];
      const filtered = favourites.filter((fav) => {
        return fav != heart.dataset.id;
      });
      localStorage.setItem("favourites", JSON.stringify(filtered));
      document.getElementById("show_favourites").click();
    });
  });
}
