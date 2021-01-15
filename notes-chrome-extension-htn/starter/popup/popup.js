var saveNote = document.querySelector('#save-note');
var deleteNotes = document.querySelector('#delete-notes');
var notesField = document.querySelector('#note-value');


// Populate Notes From Page
chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
}, tabs => {
  let url = tabs[0].url;
  let notesList = document.getElementById("notes");

  // Grab the notes for the page
  chrome.storage.local.get(url, notes => {
    if (notes[url]) {
      for (var i = 0; i < notes[url].length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(notes[url][i]));
        notesList.appendChild(li);
      }
    }
  });
});

notesField.focus();

// Delete Notes
deleteNotes.onclick = function () {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, tabs => {
    let url = tabs[0].url;
    chrome.storage.local.get(url, notes => {
      notes[url] = []
      chrome.storage.local.set(notes);
      chrome.tabs.sendMessage(tabs[0].id, {notes: notes[url], action: "clear"}, _ => {
        console.log("Cleared page");
        location.reload();
      });
    });
  });
}

// Save Note
saveNote.onclick = function () {
  //take note from the field the user typed into 
  let note = notesField.value;
  //save note and display , use KEY for the specific URL 
  chrome.tabs.query({
    active:true,
    currentWindow: true
  },function(tabs){

    let url = tabs[0].url;
    chrome.storage.local.get(url, notes =>{
      if(notes[url])
        notes[url].push(note);
      else
        notes[url]=[note];
      chrome.storage.local.set(notes);
    });


  }); //array of tab objects
  location.reload();
};
