let mapLength;
let circle;

var isSetup = false;

var showScore = true;
var showDifficulty = true;
var showNJS = true;
var showBPM = true;
var roundCorners = true;

var left = true;

var useBackgroundTest = false;

var useCompact = false;

var bgColor = "#000088";
var bgColorAlpha = 1;
var textColor = "#FFFFFF";
var textColorOutline = "#000000";

window.addEventListener("load", () =>
{
    window.addEventListener("dblclick", () => { 
        isSetup = !isSetup;
        console.log("Showing config: " + isSetup);
        ToggleConfig();
        UpdateToggles();
    });

    circle = new ProgressBar.Circle('#progress', {
        color: "#FFFFFF",
        trailColor: "#545454",
        easing: 'easeInOut',
        strokeWidth: 5,
        trailWidth: 2,
        text: {
            value: "00:00",
            className: 'progressText',
        }
    });

    mainContainer.classList.remove("visible");
    mainContainer.classList.add("hidden");

    // Add events
    scoreSwitch.oninput = function(){ 
        UpdateToggles();
        RefreshUI();
    }
    difficultySwitch.oninput = function(){ 
        UpdateToggles();
        RefreshUI();
    }
    NJSSwitch.oninput = function(){ 
        UpdateToggles();
        RefreshUI();
    }
    BPMSwitch.oninput = function(){ 
        UpdateToggles();
        RefreshUI();
    }
    roundSwitch.oninput = function(){ 
        UpdateToggles();
        RefreshUI();
    }
    leftSwitch.oninput = function(){ 
        UpdateToggles();
        RefreshUI();
    }
    /*compactSwitch.oninput = function(){ 
        UpdateToggles();
        RefreshUI();
    }*/
    testBackgroundSwitch.oninput = function(){ 
        UpdateToggles();
        RefreshUI();
    }
    colorBgPicker.oninput = function(){
        UpdateToggles();
        RefreshUI();
    }
    colorBgAlpha.oninput = function(){
        UpdateToggles();
        RefreshUI();
    }
    colorTxtPicker.oninput = function(){
        UpdateToggles();
        RefreshUI();
    }
    refreshButton.onclick = function(){
        console.log("test");
        UpdateToggles();
        RefreshUI();
    }
})

window.addEventListener("MapDataUpdated", (data) =>
{
    if (isSetup) return;

    // reset visibility
    mainContainer.classList.remove("hidden");
    mainContainer.classList.remove("visible");

    data = data.detail;

    if (data.InLevel)
    {
        mainContainer.classList.add("visible");
    }
    else {
        mainContainer.classList.add("hidden");
        return;
    }

    // Image
    beatmapImage.style.backgroundImage = data.coverImage == null ? 'url(\'assets/BeatSaberIcon.jpg\')' : 'url(\'' + data.coverImage + '\')';

    // BSR
    if (data.BSRKey == null) { 
        BSR.innerHTML = "";
    }
    else {
        BSR.innerHTML = `BSR: ${data.BSRKey}`;
    }

    mapName.classList.remove("cssmarquee");
    mapSubName.classList.remove("cssmarquee");
    artist.classList.remove("cssmarquee");

    // Map name
    mapName.innerHTML = data.SongName == null ? "" : data.SongName;
    // Map sub name
    mapSubName.innerHTML = data.SongSubName == null ? "" : data.SongSubName;
    // Artist
    artist.innerHTML = data.SongAuthor == null ? "" : data.SongAuthor;
    // Mapper
    artist.innerHTML += data.Mapper == null ? "" : ` | ${data.Mapper}`;

    // Difficulty
    if (showDifficulty && data.Difficulty != null)
    {
        difficulty.innerHTML = `${data.Difficulty}`;
    }
    else
    {
        difficulty.innerHTML = "";
    }

    // NJS
    if (showNJS && data.NJS != null)
    {
        if (difficulty.innerHTML != "")
        {
            difficulty.innerHTML += ` | NJS ${Round(data.NJS)}`;
        }
        else
        {
            difficulty.innerHTML = `NJS ${Round(data.NJS)}`;
        }    
    }
    else
    {
        difficulty.innerHTML += "";
    }
    
    // BPM
    if (showBPM && data.BPM != null)
    {
        if (difficulty.innerHTML != "")
        {
            difficulty.innerHTML += ` | BPM ${Round(data.BPM)}`;
        }
        else
        {
            difficulty.innerHTML = `BPM ${Round(data.BPM)}`;
        } 
    }
    else
    {
        difficulty.innerHTML += "";
    }

    // Map total length in seconds
    mapLength = data.Length;

    if (IsElementOverflowing(mapName)) {
        mapName.classList.add("cssmarquee");
    }
    if (IsElementOverflowing(mapSubName)) {
        mapSubName.classList.add("cssmarquee");
    }
    if (IsElementOverflowing(artist)) {
        artist.classList.add("cssmarquee");
    }   
    
})

window.addEventListener("LiveDataUpdated", (data) =>
{
    if (isSetup) return;

    data = data.detail;
    // Update progress circle
    circle.animate(data.TimeElapsed/mapLength);
    circle.setText(`${SecondsToMins(data.TimeElapsed)}`);
    // Score & stuff
    if (showScore)
    {
        score.innerHTML = `Score: ${data.Score.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ',')}`;
        score.innerHTML += ` (${Math.round((data.Accuracy + Number.EPSILON) * 10) / 10}%) `;
        score.innerHTML += `Combo: ${data.Combo.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ',')}`;
    }
    else
    {
        score.innerHTML = "";
    }
})

function ToggleConfig()
{
    if (isSetup) {

        mainContainer.classList.remove("hidden");
        mainContainer.classList.remove("visible");
        mainContainer.classList.add("visible");

        configContainer.classList.remove("hidden");
        configContainer.classList.remove("visible");
        configContainer.classList.add("visible");

         // Image
        beatmapImage.style.backgroundImage = 'url(\'assets/BeatSaberIcon.jpg\')';

        // BSR
        BSR.innerHTML = `BSR: 99999`;

        mapName.classList.remove("cssmarquee");
        mapSubName.classList.remove("cssmarquee");
        artist.classList.remove("cssmarquee");

        // Map name
        mapName.innerHTML = "Song NameSong ";
        // Map sub name
        mapSubName.innerHTML = "Secondary song nameSecondary song name";
        // Artist
        artist.innerHTML = "Artist";
        // Mapper
        artist.innerHTML += " | Mapper";

        // Difficulty
        if (showDifficulty)
        {
            difficulty.innerHTML = `ExpertPlus`;
        }
        else
        {
            difficulty.innerHTML = "";
        }

        // NJS
        if (showNJS)
        {
            if (difficulty.innerHTML != "")
            {
                difficulty.innerHTML += ` | NJS 20`;
            }
            else
            {
                difficulty.innerHTML = `NJS 20`;
            }    
        }
        else
        {
            difficulty.innerHTML += "";
        }
        
        // BPM
        if (showBPM)
        {
            if (difficulty.innerHTML != "")
            {
                difficulty.innerHTML += ` | BPM 999`;
            }
            else
            {
                difficulty.innerHTML = `BPM 999`;
            } 
        }
        else
        {
            difficulty.innerHTML += "";
        }
        // Map total length in seconds
        mapLength = 120;

        if (IsElementOverflowing(mapName)) {
            mapName.classList.add("cssmarquee");
        }
        if (IsElementOverflowing(mapSubName)) {
            mapSubName.classList.add("cssmarquee");
        }
        if (IsElementOverflowing(artist)) {
            artist.classList.add("cssmarquee");
        }

        // Update progress circle
        circle.animate(0.5);
        circle.setText(`${SecondsToMins(60)}`);
        // Score & Combo
        if (showScore)
        {
            score.innerHTML = `Score: 0,123,456 (${Round(91.11111111)}%) Combo: 9999`;
        }
        else{
            score.innerHTML = "";
        }
    }
    else {
        mainContainer.classList.remove("visible");
        mainContainer.classList.remove("hidden");
        mainContainer.classList.add("hidden");
        configContainer.classList.remove("visible");
        configContainer.classList.remove("hidden");
        configContainer.classList.add("hidden");
    }
}

function UpdateToggles()
{
    var url = location.href;
    showScore = scoreSwitch.checked;
    if (showScore)
    {
       url = addParameterToURL(url, "a");
    }
    showDifficulty = difficultySwitch.checked;
    if (showDifficulty)
    {
       url = addParameterToURL(url, "b");
    }
    showNJS = NJSSwitch.checked;
    if (showNJS)
    {
       url = addParameterToURL(url, "c");
    }
    showBPM = BPMSwitch.checked;
    if (showBPM)
    {
       url = addParameterToURL(url, "d");
    }
    roundCorners = roundSwitch.checked;
    if (roundCorners)
    {
       url = addParameterToURL(url, "e");
    }
    left = leftSwitch.checked;
    if (left)
    {
       url = addParameterToURL(url, "f");
    }  
    //useCompact = compactSwitch.checked;
    //if (useCompact)
    //{
       //url = addParameterToURL(url, "g");
    //}

    url = addParameterToURL(url, `bgColor=${bgColor}`.replaceAll("#",""));
    url = addParameterToURL(url, `alpha=${bgColorAlpha}`);
    url = addParameterToURL(url, `textColor=${textColor}`.replaceAll("#",""));

    useBackgroundTest = testBackgroundSwitch.checked;

    bgColor = colorBgPicker.value;
    bgColorAlpha = colorBgAlpha.value;
    textColor = colorTxtPicker.value;


    finalUrl.value = url;
}

function RefreshUI()
{
    mainContainer.classList.remove("roundCorners");
    if (roundCorners)
    {
        mainContainer.classList.add("roundCorners");
    }

    if (left)
    {
        mainContainer.style.float = "left";
        imageContainer.style.float = "left";
        infoContainer.style.textAlign = "left";
    }
    else
    {
        mainContainer.style.float = "right";
        imageContainer.style.float = "right";
        infoContainer.style.textAlign = "right";
    }

    document.body.style.color = textColor;
    mainContainer.style.backgroundColor = HexToRGBA(bgColor, bgColorAlpha);
    configContainer.style.backgroundColor = HexToRGBA(bgColor, bgColorAlpha);

    document.body.style.backgroundImage = useBackgroundTest ? 'url(\'assets/TestBackground.jpg\')' : null;   

    ToggleConfig();
}

function SecondsToMins(seconds)
{
    let Mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    let Seconds = (seconds - (Math.floor(seconds / 60) * 60)).toString().padStart(2, "0");
    return `${Mins}:${Seconds}`;
}

function IsElementOverflowing(element) {    
    return element.scrollWidth > element.offsetWidth;
}

function Resize(element, scale) {  
    $(element).css("transform", "scale(" + scale/5 + ")");
}

function Round(num)
{
    return Math.round((num + Number.EPSILON) * 10) / 10
}

function HexToRGBA(h, a) {
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    
    return "rgba("+ +r + "," + +g + "," + +b + "," + a + ")";
  }

