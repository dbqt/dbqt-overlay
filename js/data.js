// Live data
var time;
var score;
var accuracy;
var combo;

// Map data
var beatmapImage;
var mapName;
var mapSubName;
var BSR;
var mapper;
var artist;
var difficulty;
var njs;
var bpm;

// Other
var mainContainer;
var imageContainer;
var infoContainer;
var configContainer;

// Configs
var scoreSwitch;
var NJSSwitch;  
var BPMSwitch;  
var roundSwitch;
var difficultySwitch;
var leftSwitch;;  
var compactSwitch;
var testBackgroundSwitch;
var finalUrl;
var colorBgPicker;
var colorTxtPicker;
var colorBgAlpha;
var colorBgAlphaNumber;
var refreshButton;

window.addEventListener("load", () => {
    // Overlay
    progress = document.getElementById("progress");
    time = document.getElementById("time");
    score = document.getElementById("score");
    accuracy = document.getElementById("accuracy");
    combo = document.getElementById("combo");

    beatmapImage = document.getElementById("beatmapImage");
    mapName = document.getElementById("mapName");
    mapSubName = document.getElementById("mapSubName");
    BSR = document.getElementById("bsr");
    mapper = document.getElementById("mapper");
    artist = document.getElementById("artist");
    difficulty = document.getElementById("difficulty");
    njs = document.getElementById("njs");
    bpm = document.getElementById("bpm");

    mainContainer = document.getElementById("mainContainer");  
    imageContainer = document.getElementById("imageContainer");  
    infoContainer = document.getElementById("infoContainer");  
    configContainer = document.getElementById("configContainer");  

    scoreSwitch = document.getElementById("scoreSwitch");  
    NJSSwitch = document.getElementById("NJSSwitch");  
    BPMSwitch = document.getElementById("BPMSwitch");  
    roundSwitch = document.getElementById("roundSwitch");  
    difficultySwitch = document.getElementById("difficultySwitch");  
    leftSwitch = document.getElementById("leftSwitch");  
    //compactSwitch = document.getElementById("compactSwitch");  
    testBackgroundSwitch = document.getElementById("testBackgroundSwitch");  
    finalUrl = document.getElementById("finalUrl");  

    colorBgPicker = document.getElementById("colorBgPicker");  
    colorTxtPicker = document.getElementById("colorTxtPicker");  

    colorBgAlpha = document.getElementById("colorBgAlpha");
    refreshButton = document.getElementById("refreshButton");
    //colorBgAlphaNumber = document.getElementById("colorBgAlphaNumber");
})