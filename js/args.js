
window.addEventListener("load", () =>
{
    showScore = urlParams.has("a");
    showDifficulty = urlParams.has("b");
    showNJS = urlParams.has("c");
    showBPM = urlParams.has("d");
    roundCorners = urlParams.has("e");
    left = urlParams.has("f");
    //useCompact = urlParams.has("g");

    var url = new URL(location.href);
    
    if (url.searchParams.get("bgColor") != null) {
        bgColor =  `#${url.searchParams.get("bgColor")}`;
    }

    if (url.searchParams.get("alpha") != null) {
        bgColorAlpha =  `${url.searchParams.get("alpha")}`;
    }

    if (url.searchParams.get("textColor") != null) {
        textColor =  `#${url.searchParams.get("textColor")}`;
    }

    ToggleConfig();
    RefreshUI();  
});

function addParameterToURL(url, param){
    url += (url.split('?')[1] ? '&':'?') + param;
    return url;
}