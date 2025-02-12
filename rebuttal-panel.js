function createPanel() {
    let panel = document.createElement("div");
    panel.id = "rebuttal-panel";
    panel.style.border = "2px solid black";
    panel.style.boxSizing = "border-box";

    panel.style.width = "100%";
    panel.style.height = "100%";

    panel.style.display = "flex";
    panel.style.flexDirection = "column";

    let titleContainer = document.createElement("div");
    let title = document.createElement("h3");
    title.id = "rebuttal-title";
    title.innerText = "Rebuttals";
    title.style.textAlign = "center";
    title.style.color = "DarkRed";

    titleContainer.appendChild(title);
    
    panel.appendChild(titleContainer);

    let textScreen = document.createElement("div");
    textScreen.id = "rebuttal-textscreen";
    textScreen.style.borderTop = "2px solid black";
    textScreen.style.borderBottom = "2px solid black";
    textScreen.style.minHeight = "50px";
    textScreen.style.height = "30%";
    textScreen.style.flex = "0 0 auto";
    textScreen.style.position = "sticky";
    textScreen.style.overflowY = "scroll";
    textScreen.style.resize = "vertical";
    textScreen.style.boxSizing = "border-box";
    textScreen.style.padding = "4px";

    panel.appendChild(textScreen);

    clearButton = document.createElement("button");
    clearButton.innerText = "Clear";
    clearButton.style.boxSizing = "border-box";
    clearButton.style.padding = "10px";
    clearButton.style.margin = "10px";
    clearButton.style.width = "100px";
    clearButton.onclick = () => {
        if ((confirm("Clear rebuttal?"))) {
            document.getElementById("rebuttal-title").innerText = "Rebuttals";
            document.getElementById("rebuttal-textscreen").innerText = "";
        }
       
    };
    
    panel.appendChild(clearButton);
    let lineContainer = document.createElement("div");
    let line = document.createElement("hr");
    line.style.wdith = "100%";

    lineContainer.appendChild(line);
    
    panel.appendChild(lineContainer);

    let menu = document.createElement("div");
    menu.id = "rebuttal-menu";
    menu.style.boxSizing = "border-box";
    menu.style.padding = "4px";
    menu.style.overflowY = "scroll";
    menu.style.height = "50px";
    menu.style.display = "flex";
    menu.style.flexDirection = "column";
    menu.style.gap = "8px";
    menu.style.flex = "1 1 auto";

    panel.appendChild(menu);

    document.getElementById("right-panel").appendChild(panel);

    return panel;
}

async function run() {
    rebuttalMaker = await import("./rebuttal-maker.js");
    rebuttalPanel = createPanel();
    let rebuttals = {};

    let jsonUrl = "https://benjastro.github.io/medalert-script/data/rebuttals/not-interested.json";
    jsonUrl = "./data/rebuttals/not-interested.json";
    
    let jsonUrls = ["./data/rebuttals/not-interested.json", "./data/rebuttals/cant-decide.json", "./data/rebuttals/cant-afford.json", "./data/rebuttals/company-credibility.json", "./data/rebuttals/card-information.json", "./data/rebuttals/equipment-questions.json", "./data/rebuttals/faq.json"];
    
    for (let i = 0; i < jsonUrls.length; ++i) {
        let data = await rebuttalMaker.fetchData(jsonUrls[i]);
        element = rebuttalMaker.createErrorElements();
    
        if (data) {
            element = rebuttalMaker.createElements(data);
            document.getElementById("rebuttal-menu").appendChild(element);
        }

        rebuttals = Object.assign(rebuttals, data);
    }
    
    delete rebuttals.name

    document.querySelectorAll(".rebuttal-button").forEach(element => {
        element.onclick = () => {
            document.getElementById("rebuttal-title").innerText = element.innerText;
            document.getElementById("rebuttal-textscreen").innerText = element.innerText;
            document.getElementById("rebuttal-textscreen").innerText += "\n\n" + rebuttals[element.id]["content"];
        }
    });

}

run()