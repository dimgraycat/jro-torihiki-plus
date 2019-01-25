let script = (list: string[]): void => {
  list.forEach((file) => {
    let elem = document.createElement('script');
    elem.setAttribute('src', chrome.extension.getURL(file));
    document.body.appendChild(elem);
  });
}

let css = (list: string[]): void => {
  list.forEach((file) => {
    let link = document.createElement("link");
    link.href = chrome.extension.getURL(file);
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
  });
}

script(['scripts/contentscript.js']);
css(['styles/jro_torihiki_plus.css']);
