function createRedStatesPanel() {
    let panel = document.createElement("div");

    let strong = document.createElement("strong");
    strong.innerText = "Red States: ALASKA, HAWAII & PUERTO RICO"
    strong.style.color = "red";

    panel.style.border = "2px solid black";
    panel.style.position = "sticky";
    panel.style.top = 0;
    panel.style.backgroundColor = "white";
    panel.style.boxSizing = "borderBox";

    panel.appendChild(strong);

    return panel;
}

function idPutPanel(id, panel) {
    document.getElementById(id).appendChild(panel);
}