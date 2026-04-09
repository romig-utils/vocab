function showList(parent,config) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('page')) {
        const pageParam = urlParams.get('page');
        console.log(pageParam)
    } else {
        const url = new URL(window.location.href);
        url.searchParams.set('page', 'home');
        window.history.pushState({}, '', url);
    }
    getOptions(parent,config,"/home",config);
}

function getOptions(parent,config,param,list) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', param);
    console.log(param)

    var parts = param.split("/").filter(Boolean);
    parts = parts.filter(parts => parts != "home")
    console.log(parts);

    let currentKey = config;
    for (const key of parts) {
      currentKey = currentKey?.[key];
    }
    console.log(currentKey);
    
    window.history.pushState({}, '', url);
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
                getOptions(parent,config,param+"/"+key,value);
            }
        }
    }
}