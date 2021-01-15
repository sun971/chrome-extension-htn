// Background.js
//be able to look for certain web page and set a rule when our app can be used 
//we have two keys 
//refers to page url as key as bunch of keys that will define which urls we want to use our website for 
var pageConditions={
    conditions:[new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
            schemes:['https','http'] //given that our url has the 2, make sure UI is displayer
                                    //also use URL contains

        }
    })],
    actions:[new chrome.declarativeContent.ShowPageAction()]
}
//this is just an empty array 
chrome.runtime.onInstalled.addListener(function(){
    //remove all rules and specify undefined as first parameter and a call back function
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
        //take in array of rules (pageConditions)
        chrome.declarativeContent.onPageChanged.addRules([pageConditions]);  //Really Important!! 
    });
});