import {Job} from "../models/job.js";

export async function showAll() {
    const favourites = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : [];
    const response = await fetch("https://remotive.com/api/remote-jobs?limit=200");
    const jobs0 = await response.json();
    const jobs = jobs0.jobs;
    
    for(const jo of jobs) {
        const job = new Job(jo.candidate_required_location, jo.category, jo.company_name, jo.description,
        jo.id, jo.job_type, jo.publication_date, jo.salary, jo.title, jo.url);
        job.display(job, favourites);
    }
}