var userLang = navigator.language || navigator.userLanguage;

if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)))
{
  if (userLang === 'it' || userLang === 'it-It') {
    alert("Questa app non funziona in Internet Explorer, utilizza Mozilla Firefox o Google Chrome.");
  } else {
    alert("This app does not work in Internet Explorer, please use Mozilla Firefox or Google Chrome.");
  }
}