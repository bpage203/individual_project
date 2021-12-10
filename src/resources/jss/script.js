// updates cocktail variable from input
function update_cocktail(){
  var cocktail = document.getElementById("tag").value;
}

// gets info about cocktail from api
function makeApiCall(cocktail){
  var url = "www.thecocktaildb.com/api/json/v1/1/search.php?s="+cocktail;
  $(document).ready(function() {
  $.ajax({url:url, dataType:"json"}).then(function(data) {
      let div1 = document.createElement("div");
      div1.className = "container";
      let div2 = document.createElement("div");
      div2.className = "card";
      div2.setAttribute("style","width: 20rem;");
      let div3 = document.createElement("div");
      div3.className = "card-body";
      let image = document.createElement("img");
      image.setAttribute("src",data.photos.photo[i].url_sq);
      let title = document.createElement("p");
      title.append(data.photos.photo[i].title);
      div3.appendChild(title);
      div3.appendChild(image);
      div2.appendChild(div3);
      div1.appendChild(div2);
      document.getElementById("cocktail_card").appendChild(div1);
    });
  });
}

// loads reviews table, loads everything initially, can be filtered with search bar
function loadReviews(num){
  var table = document.getElementById("reviews_table");
  if (num==0){
    for (var i = 1; i < reviews.length; i++){
      let div1 = document.createElement("tr");
      let div2 = document.createElement("th");
      div2.append(cocktail);
      let div3 = document.createElement("th");
      div3.append(reviews[i]);
      let div4 = document.createElement("th");
      div4.append(review_dates[i]);
      div3.appendChild(div4);
      div2.appendChild(div3);
      div1.appendChild(div2);
      document.getElementById("cocktail_card").appendChild(div1);
    }
  }
  else {
    let div1 = document.createElement("tr");
    let div2 = document.createElement("th");
    div2.append(cocktail);
    let div3 = document.createElement("th");
    div3.append(reviews[0]);
    let div4 = document.createElement("th");
    div4.append(review_dates[0]);
    div3.appendChild(div4);
    div2.appendChild(div3);
    div1.appendChild(div2);
    document.getElementById("cocktail_card").appendChild(div1);
  }
}
