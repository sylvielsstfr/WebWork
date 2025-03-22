const myTitle = document.getElementById("intro");
console.log(myTitle);

myTitle.textContent = "Presentation du DOM";
myTitle.style.color = "red";
myTitle.style.fontSize = "2em";
myTitle.style.fontWeight = "bold";
myTitle.style.textAlign = "center";
//myTitle.style.backgroundColor = "yellow";
myTitle.style.padding = "10px";
myTitle.style.border = "2px solid black";
myTitle.style.borderRadius = "10px";
myTitle.style.boxShadow = "5px 5px 5px black";

const myParaUrl = document.getElementById("paraUrl");
myParaUrl.innerHTML =
  "Paragraphe de description ave un  <a href='https://www.google.com' target='_blank'>Google</a>";
console.log(myParaUrl.innerHTML);

const myLink = document.querySelector("a");
myLink.setAttribute("href", "https://www.example.com");
myLink.setAttribute("target", "_blank");
myLink.textContent = "Example";
console.log(myLink);
console.log(myLink.getAttribute("href"));
console.log(myLink.textContent);

const myTitle2 = document.getElementById("title1");
myTitle2.style.color = "blue";
myTitle2.style.fontSize = "2em";
myTitle2.style.fontWeight = "bold";
myTitle2.style.textAlign = "center";
myTitle2.style.padding = "10px";
myTitle2.style.border = "2px solid red";
myTitle2.style.borderRadius = "10px";
myTitle2.style.boxShadow = "5px 5px 5px black";

const summaryDiv = document.getElementById("summary");
summaryDiv.style.backgroundColor = "lightyellow";
summaryDiv.style.padding = "10px";
summaryDiv.style.border = "2px solid black";
summaryDiv.style.borderRadius = "10px";
summaryDiv.style.boxShadow = "5px 5px 5px black";

const introElements = document.getElementsByClassName("introduction");
for (let i = 0; i < introElements.length; i++) {
  introElements[i].style.color = "purple";
  introElements[i].style.fontSize = "1.5em";
  introElements[i].style.fontWeight = "bold";
  introElements[i].style.textAlign = "left";
  introElements[i].style.padding = "10px";
  introElements[i].style.border = "2px solid blue";
  introElements[i].style.borderRadius = "10px";
  introElements[i].style.boxShadow = "5px 5px 5px black";
}

myTitle2.style.setProperty("font-size", "60px");
myTitle2.style.removeProperty("border");

const myPara = document.getElementById("paraUrl");
myPara.remove();
console.log(myPara);
console.log(document.getElementById("paraUrl"));

const summaryDiv2 = document.getElementById("summary");
const firstParagraph = summaryDiv2.getElementsByTagName("p")[0];
summaryDiv2.removeChild(firstParagraph);

console.log(summaryDiv2.innerHTML);

const newParagraph = document.createElement("p");
newParagraph.textContent = "New paragraph added to the summary";
summaryDiv2.appendChild(newParagraph);

const newParagraph2 = document.createElement("p");
newParagraph2.textContent = "Another new paragraph added to the summary";
summaryDiv2.insertBefore(newParagraph2, newParagraph);
