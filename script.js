const AddBtn = document.getElementById("submit-btn");
const BookContainer = document.getElementById("bookmark-container");


window.addEventListener('DOMContentLoaded' , (event) => {
    // go to session storage and then dump the contents to the ui
    // event.preventDefault();
    if (sessionStorage.length <= 1){
        return;
    }
    for (let i = 0 ; i < sessionStorage.length ; i++){
        let BookMarkKey = sessionStorage.key(i);
        let Book = sessionStorage.getItem(BookMarkKey);
        let BookObject = JSON.parse(Book);
        let BookTitle = BookObject.title;
        let BookUrl = BookObject.url;
        if (!BookTitle || !BookUrl){
            continue; // skip if the title or url is not present
        }
        CreateTheDiv(BookMarkKey , BookTitle , BookUrl);
    }

})

function CreateTheDiv(id , title , url){
    let DivNew = document.createElement("div");
    DivNew.id = id;
    DivNew.innerText = title;
    let RemoveBtn = document.createElement("button");
    RemoveBtn.classList.add("Appended");
    RemoveBtn.classList.add("btn");
    RemoveBtn.innerText = "Remove";
    RemoveBtn.addEventListener("click" , ForRemoverBtn);
    DivNew.classList.add("Appended");
    DivNew.appendChild(RemoveBtn);
    DivNew.addEventListener("click" , (event) => ForDiv(event , url));

    let first = BookContainer.firstChild || null;
    if (first){
        BookContainer.insertBefore(DivNew , first);
    }

    else{
        BookContainer.appendChild(DivNew);
    }



}

AddBtn.addEventListener("click" , 
    (event) => {

        const Form = document.getElementById("bookInfo");

        // console.log(Object.prototype.toString.call(Form));
        const FormInfo = new FormData(Form);
        event.preventDefault();
        let bookName = FormInfo.get("book-title");
        let bookLink = FormInfo.get("url-link");

        if (!bookName || !bookLink){
            alert("Please fill in both fields.");
            return;
        }

        

        console.log(" Add btn clicked.");

        let AddedDiv = document.createElement("div");

        AddedDiv.innerText = bookName;

        AddedDiv.classList.add("Appended");

        
        let AddedDivId = Date.now();
        // to make it a unique id and key

        AddedDiv.id = AddedDivId;
        let StoredBookMark = {
            title : bookName ,
            url : bookLink
        }

        sessionStorage.setItem(AddedDivId , JSON.stringify(StoredBookMark) );
        // the key-value pairs in sessionStorage need to be both strings


        let Btn = document.createElement("button");
        AddedDiv.appendChild(Btn);
        Btn.classList.add("Appended");
        Btn.classList.add("btn");
        Btn.innerText = "Remove";

        let FirstElt = BookContainer.firstChild;
        BookContainer.insertBefore(AddedDiv , FirstElt);

        AddedDiv.addEventListener("click" , (event) => ForDiv(event , bookLink));
        // this is to open the link in a new tab when the div is clicked

        Btn.addEventListener("click" , ForRemoverBtn);

    }
)


function ForRemoverBtn(event){
    event.stopPropagation();
    console.log("Remove btn clicked.");
    let RemoveBtn = event.currentTarget;
    let DivThen = RemoveBtn.parentNode;
    let theRemovedDivId = DivThen.id;
    DivThen.remove();
    sessionStorage.removeItem(theRemovedDivId);
}

function ForDiv(event , bookLink){
    event.stopPropagation();
    window.open(bookLink , "_blank");
}