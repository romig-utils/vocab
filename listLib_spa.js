function showList(parent,config,state) {
    getOptions(parent,config,config,state);
}

function getOptions(parent,config,list,state) {
    window.history.pushState(state, null, state);
    html = ``;
    parent.replaceChildren();
    for (const [key, value] of Object.entries(list)) {
        console.log(`${key}: ${value}`);
        if (key != "listHeader") {
            if (typeof value === "string") {
                html += `<a href="${value}">${key}</a><br>`;
            } else {
                html += `<button id="${key}">${key}</button><br>`;
            }
        } else {
            html = `<p>${value}</p>` + html;
        }
    }
    parent.innerHTML = html
    for (const [key, value] of Object.entries(list)) {
        if (typeof value !== "string") {
            document.getElementById(key).onclick = function() {
                getOptions(parent,config,value,state);
            }
        }
    }
}