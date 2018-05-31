var counter = 0;
function changeBG(){
    var imgs = [
        "url(https://image.tmdb.org/t/p/original/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg)",
        "url(https://image.tmdb.org/t/p/original/uRojJ77wDQdzzVvP1VDjnvCWiDb.jpg)",
        "url(https://image.tmdb.org/t/p/original/5g2n9uGbEJKGn5SgO1se5kVoevR.jpg)",
        "url(https://image.tmdb.org/t/p/original/xBKGJQsAIeweesB79KC89FpBrVr.jpg)",
        "url(https://image.tmdb.org/t/p/original/ctOEhQiFIHWkiaYp7b0ibSTe5IL.jpg)",
        "url(https://image.tmdb.org/t/p/original/4kFUCfvJ8GoEnVPZ5LoVGIN6mHF.jpg)",
        "url(https://image.tmdb.org/t/p/original/vFUI5obFtx4IdhP6k8Om5ezHTrk.jpg)",
        ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 4000);