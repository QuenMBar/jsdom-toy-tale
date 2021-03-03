let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";
        } else {
            toyFormContainer.style.display = "none";
        }
    });

    getAndPopToys();

    const toyForm = document.querySelector(".add-toy-form");
    toyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let dataObj = {
            name: e.target.name.value,
            image: e.target.image.value,
            likes: 0,
        };
        let postObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(dataObj),
        };
        fetch("http://localhost:3000/toys", postObj).then((response) => getAndPopToys());
    });
});

function getAndPopToys() {
    const toyList = document.getElementById("toy-collection");
    toyList.innerHTML = "";
    fetch("http://localhost:3000/toys")
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            data.forEach((element) => {
                let toyCard = document.createElement("div");
                toyCard.className = "card";
                toyCard.id = element.id;
                let toyName = document.createElement("h2");
                toyName.append(element.name);
                toyCard.append(toyName);
                let toyImg = document.createElement("img");
                toyImg.src = element.image;
                toyImg.className = "toy-avatar";
                toyCard.append(toyImg);
                let toyLikes = document.createElement("p");
                toyLikes.append(element.likes, " Likes");
                toyCard.append(toyLikes);
                let toyBttn = document.createElement("button");
                toyBttn.className = "like-btn";
                toyBttn.append("Like <3");
                toyBttn.addEventListener("click", (e) => {
                    let newLikes = parseInt(e.target.previousElementSibling.innerHTML) + 1;
                    e.target.previousElementSibling.innerHTML = newLikes.toString() + " Likes";
                    let dataObj = { likes: newLikes };
                    let postObj = {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                        body: JSON.stringify(dataObj),
                    };
                    fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`, postObj);
                });
                toyCard.append(toyBttn);
                toyList.append(toyCard);
            });
        });
}
