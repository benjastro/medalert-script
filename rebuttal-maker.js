export async function fetchData(jsonUrl, finally_callback) {
    const response = await fetch(jsonUrl);

    if (!response.ok) {
        return false;
    }

    const data = await response.json();
    // returns json object
    const dataInJson = JSON.parse(JSON.stringify(data));
    

    return dataInJson;
}

export function createElements(jsonData) {
    let mainContainer = document.createElement("div");
    let title = document.createElement("button");
    title.style.boxSizing = "border-box";
    title.style.padding = "12px"
    title.innerText = "Loading...";
    if ("name" in jsonData) {
        title.innerText = `${jsonData["name"]}`;
    }

    mainContainer.appendChild(title);

    let menu = document.createElement("ul");
    menu.style.listStyleType = "none";
    menu.style.display = "none";
    menu.style.flexDirection = "column";
    menu.style.gap = "6px";

    title.onclick = () => {
        if (menu.style.display == "flex") {
            menu.style.display = "none";
            return;
        }

        menu.style.display = "flex"
    }


    for (const key in jsonData) {
        if (key == "name") {
            continue;
        }

        let obj = jsonData[key]
        let listitem = document.createElement("li");

        let button = document.createElement("button");

        button.style.width = "100%";
        button.style.boxSizing = "border-box";
        button.style.padding = "10px";
        button.style.textAlign = "left";
        button.className = "rebuttal-button";

        button.style.display = "block";
        button.id = key;
        button.innerText = obj["name"];
        if ("number" in obj) {
            button.innerText = key + ". " + obj["name"];
        }

        listitem.appendChild(button);

        menu.appendChild(listitem);
        
    }

    mainContainer.appendChild(menu);

    return mainContainer;
}

export function createErrorElements() {
    let title = document.createElement("h2");
    title.innerText = "Panel - An error occurred! please try again!";
    title.style.color = "red";

    return title;
}