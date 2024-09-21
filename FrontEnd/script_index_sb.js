document.addEventListener("DOMContentLoaded", async () => {
    let gallery = document.querySelector(".gallery");
      let response = await fetch("http://localhost:5678/api/works");
      let pictures = await response.json();
  console.log(pictures)
      const article = pictures[0]; 
      console.log(article)
      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl; 
      gallery.appendChild(imageElement)
    

























      
  })