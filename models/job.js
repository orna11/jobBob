export class Job {
    constructor(location, category, company, description, id, type, date, salary, title, url) {
        this.location = location;
        this.category = category;
        this.company = company;
        this.description = description;
        this.id = id;
        this.type = type;
        this.date = date;
        this.salary = salary;
        this.title = title;
        this.url = url;
        this.favourite = false;
    }

    display(obj, arr) {
        const container = document.querySelector("#jobs_container");
        const div = document.createElement("div");

        if(arr.includes(obj.id)) {
            div.setAttribute("class", "selected_job");
        } else {
            div.setAttribute("class", "job");
        }
      
        
        const title = document.createElement("h3");
        title.textContent = obj.title;
      /*   title.style = "grid-area: title"; */
      title.className = "title";

        const description = document.createElement("p");
        const content0 = obj.description.substr(0, 300);
        const content = content0.substr(0, Math.min(content0.length, content0.lastIndexOf(" ")));
        description.innerHTML = content + "...";
/*         description.style = "grid-area: description"; */
description.className = "description";

        const category = document.createElement("h4");
        category.textContent = `#${obj.category}`;
        const link = document.createElement("a");
/*         category.style = "grid-area: category"; */
category.className = "category";

        link.textContent = "Read More and Apply";
        link.setAttribute("href", obj.url);    
/*         link.style = "grid-area: link"; */
link.className ="link";


        const type = document.createElement("span");
        const options = {
            part_time: "Part time",
            full_time: "Full time",
            contract: "Contract"
        };
        type.textContent = options[obj.type];
        type.style.display = "inline-block";
        type.style = "margin-left: 2rem";
 /*        type.style = "grid-area: type"; */
 type.className = "type";

        const heart = document.createElement("button");

        if(arr.includes(obj.id)) {
            heart.textContent = "✔Added to Favourites";
        } else {
            heart.textContent = "💙Add to Favourites";
        }
        heart.style = "grid-area: favourites";
        heart.className = "heart";
        heart.setAttribute("data-id", obj.id);

        div.append(title, heart, category, type, description, link);
        container.append(div);

        heart.addEventListener("click", () => {
            const favourites = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : [];
            favourites.push(obj.id);
            localStorage.setItem("favourites", JSON.stringify(favourites));
/*             div.style = "border: 4px solid blue"; */
            heart.textContent = "✔Added to favourites";
            div.classList.remove("job");
            div.classList.add("selected_job");
        })
    }

    remove(obj) {
        const heart_btn = document.querySelector(`button[data-id="${obj.id}"]`);
        const div = heart_btn.parentNode;
        div.remove();
    }
}