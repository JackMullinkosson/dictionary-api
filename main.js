
    var verbs = [];
    //seperate words into own elements  
    var $div = $('.book');
    var divWords = $div.text().split(' ');
    $div.empty();
    $.each(divWords, function(i,w){
    $('<span class="word"/>').text(w).appendTo($div).append(' ');
    });
    const words = [];
    
    //info box variables
    var $word = $('.word');
    var $verticalLine = $('#vertical-line');
    var $infoBox = $('.infoBox');
    $infoBox.css('display','none');
    var $currentWord = $('#currentWord');
    $currentWord.append(' ');
   
    //get info box on hover
    $word.hover(
      function(e){
      var elem = e.target.getBoundingClientRect();
      $verticalLine.css('top', elem.top - 32 + 'px');
      $verticalLine.css('left', elem.x   - 15 + 'px');
      $verticalLine.css('display','block');
      $infoBox.css('top', elem.top - 300 + 'px');
      $infoBox.css('left', elem.x  - 50 + 'px');
      $infoBox.css('display','flex');
      getWordInfo(e)
    },
      function(){
        $infoBox.css('display','none');
        $verticalLine.css('display','none');
      }
    )

    getWordInfo = (e) => {
        let highlightedWord=e.target.textContent.replace(/[^\w\s]/g,"").trim()
        highlightedWord = highlightedWord.charAt(0).toUpperCase() +highlightedWord.slice(1)
        $currentWord.text(highlightedWord)
        getSentence(highlightedWord)
    }

   
function showSentence(data){
    console.log(data)
    var shortest = data.reduce((a, b)=>{
        return a.sentence.length <= b.sentence.length ? a : b;
    })
    $('#sampleSentence').html(shortest.sentence)
}

    var getSentence = function (word) {
    
        $.ajax({
          method: "GET",
          url: "https://significado.herokuapp.com/v2/frases/" + word +'"',
          dataType: "json",
          success: function(data) {
            showSentence(data)
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
          }
        });
      };

   