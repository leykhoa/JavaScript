$(document).ready(function(){
  //Tạo hàm lấy headline news
  fetch("https://gnews.io/api/v4/top-headlines?&lang=en&token=28d45c1a57a7142f477eb7b0e685bac0")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let latestNews = data.articles;
    console.log(latestNews)
    let output = "";
    for (var i = 0; i < latestNews.length; i++) {
      output += `
      <div class="news">
        <div class="news-content">
          <h4 class="content-title"><a href="${latestNews[i].url}" target="_blank" title="${latestNews[i].title}">${latestNews[i].title}</a></h4>
          <h6><i>Source:</i> ${latestNews[i].source.name} </h6>
          <h6><i>Published:</i> ${latestNews[i].publishedAt}</h6>
          <p>${latestNews[i].description}</p>
          <a href="${latestNews[i].url}" target="_blank">Read More</a>
        </div>
        <img src="${latestNews[i].image}" class="responsive-img" alt="${latestNews[i].title}">
      </div>
      `;
    };
    document.getElementById("getnews").innerHTML = output;
    //Tắt biểu tượng loading khi tải dữ liệu từ API hoàn thành
    $(".loading-icon-h").addClass("hide");
  });

  //Tạo modal
  $("#btn").click(function(){
    $(".searchtool").css("display","block");
  });
  $(window).click(function(event){
    if (event.target.className === "searchtool") {
      $(".searchtool").css("display","none");
    }
  });
  //Tạo hàm tìm kiếm
  $("#content-search").keyup(function(event){
    if (event.keyCode === 13) {
      $("#search").click()
    }
  });
  $("#search").click(function(){
    $("#search-content").css("display","block");
    var keyword = $("#content-search").val();
    fetch("https://gnews.io/api/v4/search?q=" + keyword + "&lang=en&&token=28d45c1a57a7142f477eb7b0e685bac0")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {       
      let searchNews = data.articles;
      let result = "";
      if (searchNews.length == 0){
        result += `<div class="news">No results found!</div>`;
      } else {
        for (var j = 0; j < searchNews.length; j++) {
          result += `
          <div class="news">
            <div class="news-content">
              <h4 class="content-title"><a href="${searchNews[j].url}" target="_blank" title="${searchNews[j].title}">${searchNews[j].title}</a></h4>
              <h6><i>Source:</i> ${searchNews[j].source.name} </h6>
              <h6><i>Published:</i> ${searchNews[j].publishedAt}</h6>
              <p>${searchNews[j].description}</p>
              <a href="${searchNews[j].url}" target="_blank">Read More</a>
            </div>
            <img src="${searchNews[j].image}" class="responsive-img" alt="${searchNews[j].title}">
          </div>
          `;
        };
      }
      document.getElementById("tiki").innerHTML = keyword;
      document.getElementById("search-result").innerHTML = result;
      //Tắt biểu tượng loading khi tải dữ liệu từ API hoàn thành
      $(".loading-icon-s").addClass("hide");
      $(".searchtool").css("display","none");
    });
  });
  //Reload data
  $("#home").click(function() {
    location.reload();
  });
});