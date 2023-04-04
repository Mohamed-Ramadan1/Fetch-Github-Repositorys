let inputFiled = document.querySelector(".get-repos input")
getBtn = document.querySelector(".get-btn")
showData = document.querySelector(".show-data");




getBtn.onclick = () => {
    getRepos(inputFiled.value);
}


//Get Repos Function.
function getRepos(userName) {
    if (inputFiled.value === "") {
        showData.innerHTML="<span> Enter Valid Github UserName.</span>"

    } else {
        fetch(`https://api.github.com/users/${userName}/repos`)
            .then(response => response.json())
            .then((repositories) => {
                showData.innerHTML = "";

                repositories.forEach(repo => {
                    let mainDiv = document.createElement("div"),
                        repoName = document.createTextNode(repo.name);
                    
                    mainDiv.appendChild(repoName);

                    //create repo URL
                    let theUrl = document.createElement("a"),
                        urlText = document.createTextNode("Visite Repositry");
                    theUrl.href = `https://github.com/${inputFiled.value}/${repo.name}`;
                    theUrl.setAttribute("target", "_blank");
                    theUrl.appendChild(urlText);
                    mainDiv.appendChild(theUrl);

                    // the stars number
                    let span = document.createElement("span"),
                        spanText = document.createTextNode(`Stars Number ${repo.stargazers_count}`)
                    span.appendChild(spanText);
                    mainDiv.appendChild(span);



                    mainDiv.className = "repo-box";
                    //append the repo box to the show data section 
                    showData.appendChild(mainDiv);


                });
            });
    }

}