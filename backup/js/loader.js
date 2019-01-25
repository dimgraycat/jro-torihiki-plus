var scripts = ['js/jro_torihiki_plus.js'];
var csses = ['css/jro_torihiki_plus.css'];
csses.forEach(function(css) {
    var link = document.createElement("link");
    link.href = chrome.extension.getURL(css);
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
});
scripts.forEach(function(js){
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', chrome.extension.getURL(js));
    document.documentElement.appendChild(scriptElement);
});
