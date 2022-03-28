// main variables and connexion with api

const form = document.querySelector("#searchForm");
const images = [];

form.addEventListener('submit', async e => {
    e.preventDefault();
    for (let i = images.length - 1; i >= 0; i--) {
        images[i].src = ' ';
        images.pop();
    }
    const searchTerm = form.elements.query.value;
    const config = {
        params: {
            q: searchTerm
        }
    };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    displayImages(res.data);
    form.elements.query.value = '';

})


// loop for show catalog and create a new view with user favourites when they click on like button

const displayImages = shows => {
    for (let result of shows) {
        if (result.show.image) {

            console.log(result);


            const div = document.getElementById("catalog")
            const container = document.createElement("div");
            container.id = "container";
            const image = document.createElement("img");
            image.src = result.show.image.medium;
            image.id = "catalogsearch";
            const link = document.createElement("a");
            link.href = result.show.url;
            link.target = "_blank";
            const element = document.createElement("div");
            element.id = "title";
            element.innerText = result.show.name;
            const description = document.createElement("div");
            description.id = "description";
            const like = document.createElement("button");
            like.id = "favoritos";
            const classButton = "btn btn-primary";
            like.classList.add.apply(like.classList, classButton.split(" "));
            const icon = document.createElement("i");
            like.appendChild(icon);
            const classNames = "fa regular fa-heart";
            icon.classList.add.apply(icon.classList, classNames.split(" "));
            var add = document.getElementById('favourites');
            like.addEventListener('click', function (event) {
                // event.target contains the element that was clicked
                var item = event.target.container;
                add.appendChild(container);
                like.style.display = "none";
                const remove = document.createElement("button");
                remove.id = "remove";
                const classButton = "btn btn-primary";
                remove.classList.add.apply(remove.classList, classButton.split(" "));
                remove.innerHTML = "REMOVE";
                element.after(remove);
                remove.addEventListener("click", () => {
                    container.style.display = "none";
                });
                var myContent = document.getElementById("favourites");
                console.log();
                localStorage.setItem("myKey", myContent.outerHTML);
                console.log(localStorage);

            });
            description.innerHTML = result.show.summary;
            div.appendChild(container);
            container.appendChild(link);
            link.appendChild(image);
            link.after(element);
            element.appendChild(description);
            element.after(like);
            images.push(image);
        }
    }
}

// function to storage the favourites in local storage 

function load() {

    const storage = document.getElementById("results");
    storage.innerHTML = localStorage.getItem("myKey");
    const resect = document.createElement("button");
    resect.id = "resect";
    resect.innerHTML = "Clear favourites list";
    const classButton = "btn btn-primary";
    resect.classList.add.apply(resect.classList, classButton.split(" "));
    const section = document.createElement("div");
    section.id = "section"
    storage.after(section);
    section.appendChild(resect);
    document.getElementById("resect").onclick = function myFunction() {
        localStorage.clear();
        location.reload();
    }

}

window.onload = load;

//function to validate the form 

function validateForm() {
    let name = document.forms["myForm"]["fname"].value;
    let lastname = document.forms["myForm"]["lname"].value;
    let email = document.forms["myForm"]["email"].value;

    if (name == "") {
        alert("Name must be filled out");
        return false;
    } else if (lastname == "") {
        alert("Last Name must be filled out");
        return false;
    } else if (email == "") {
        alert("email must be filled out");
        return false;
    }

    return true;
}
