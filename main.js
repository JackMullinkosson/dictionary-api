
var verbs = [];

//seperate words into own elements  
var $div = $('.book');
var divWords = $div.text().split(' ');
$div.empty();
$.each(divWords, function(i,w){
$('<span class="word"/>').text(w).appendTo($div).append(' ');
    });
    

var sampleSentence;
var author;
var partOfSpeech;
var wordInfo;     

//info box variables
var $word = $('.word');
var $verticalLine = $('#vertical-line');
var $infoBox = $('.infoBox');
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

function getWordInfo(e){
        let highlightedWord=e.target.textContent.replace(/[^\w\s]/g,"").trim()
        capitalizedHighlightedWord = highlightedWord.charAt(0).toUpperCase() +highlightedWord.slice(1)
        getSentence(highlightedWord)
        getPartOfSpeech(highlightedWord)
        wordInfo = {
            word: capitalizedHighlightedWord,
            translation: 'english',
            qualifier: 'qualifier',
            infinitive: 'infinitive',
        }
        
        renderWordInfo()
       
    }


function renderWordInfo(){
    var source = $('#template').html()
        var template = Handlebars.compile(source)
        var newHTML = template(wordInfo)
        $('.infoBox').html(newHTML)
}

//get and set shortest sentence
function showSentence(data, word){
    var shortest = data.reduce((a, b)=>{
        return a.sentence.length <= b.sentence.length ? a : b;
    }) 
    var splitUp = shortest.sentence.split(' ')
    var index = splitUp.indexOf(word.toLowerCase())
    var boldWord = splitUp.slice(index,index+1)
    var firstPart = splitUp.slice(0, index).join(' ')
    var secondPart = splitUp.slice(index+1, splitUp.length).join(' ')
    console.log(secondPart)
    wordInfo['firstPart'] = firstPart
    wordInfo['boldWord'] = boldWord
    wordInfo['secondPart'] = secondPart
    wordInfo['author'] = shortest.author
    renderWordInfo();
}


function showPartOfSpeech(data){
    partOfSpeech=data[0].partOfSpeech.split(' ')
    wordInfo['partOfSpeech'] = '(' + partOfSpeech[0] + ')'
    renderWordInfo();
}

var getSentence = function (word) {
        $.ajax({
          method: "GET",
          url: "https://significado.herokuapp.com/v2/frases/" + word,
          dataType: "json",
          success: function(data) {
            showSentence(data, word)
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
          }
        });
      };

var getPartOfSpeech = function (word) {
        $.ajax({
          method: "GET",
          url: "https://significado.herokuapp.com/v2/" + word,
          dataType: "json",
          success: function(data) {
            showPartOfSpeech(data)
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
          }
        });
      };

    