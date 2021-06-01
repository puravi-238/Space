(
  function()
  {
    var questions = [{
      question: "Which of the following phenomenon cannot be observed on the surface of the moon",
      choices: ["Rising and setting of the sun","Solar eclipse","Motion of comets","Twinking of Star"],
      correctAnswer: 3
    }, {
      question: "which of the following was the first artificial satellite",
      choices: ["Lander Beagle","Sojourner","Apollo 11","Sputnik"],
      correctAnswer: 3
    }, {
      question: "Black hole is",
      choices: ["A dark hollow cavity","A massive collapsing star","The other side of sun","Neutron Star"],
      correctAnswer: 1
    }, {
      question: "The first person to enter into space was",
      choices: ["Valentina Tereshkova","Edward H.White","Yuri Gagarin","Alan Shepard"],
      correctAnswer: 2
    }, {
      question: "Which of the following planets is named after Greek God,Unlike others which are named after Roman God",
      choices: ["Uranus","Neptune","Jupiter","Mercury"],
      correctAnswer: 0
    }];
  
    var questionCounter = 0; 
    var selections = []; 
    var quiz = $('#quiz'); 
  
    displayNext();
  
    $('#next').on('click', function (e) 
	                       {
                               e.preventDefault();
    
                               if(quiz.is(':animated'))
							   {        
                                    return false;
                               }
                               choose();
    
                               if (isNaN(selections[questionCounter]))
							   {
                                   alert('Please make a selection!');
                               } 
							   else 
							   {
                                   questionCounter++;
                                   displayNext();
                               }
                           });
   
  $('#start').on('click', function (e)
                         {
                              e.preventDefault();
    
                              if(quiz.is(':animated'))
							  {
                                   return false;
                              }
                              questionCounter = 0;
                              selections = [];
                              displayNext();
                              $('#start').hide();
	                          $('#next').show();
                         });
  
  $('.button').on('mouseenter', function ()
                               {
                                   $(this).addClass('active');
                               });
							   
  $('.button').on('mouseleave', function () 
                               {
                                   $(this).removeClass('active');
                               });
  
  function createQuestionElement(index)
  {
       var qElement = $('<div>', {
                                  id: 'question'
                                 });
    
       var header = $('<h2>Question ' + (index + 1) + ':</h2>');
       qElement.append(header);
    
       var question = $('<p>').append(questions[index].question);
       qElement.append(question);
    
       var radioButtons = createRadios(index);
       qElement.append(radioButtons);
    
       return qElement;
  }
  
  function createRadios(index)
  {
      var radioList = $('<ul>');
      var item;
      var input = '';
	  
      for (var i = 0; i < questions[index].choices.length; i++)
	  {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += questions[index].choices[i];
          item.append(input);
          radioList.append(item);
      }
      return radioList;
  }
  
  function choose() 
  {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  function displayNext() 
  {
        quiz.fadeOut(function()
                	{
                        $('#question').remove();
      
                        if(questionCounter < questions.length)
						{
                            var nextQuestion = createQuestionElement(questionCounter);
                            quiz.append(nextQuestion).fadeIn();
							
                            if (!(isNaN(selections[questionCounter]))) 
							{
                               $('input[value='+selections[questionCounter]+']').prop('checked', true);
                            }
						}
						else
                        {
                           var scoreElem = displayScore();
                           quiz.append(scoreElem).fadeIn();
                           $('#next').hide();
                           $('#start').show();
                        }
                    });
  }
  
  
  function displayScore() 
  {
      var score = $('<p>',{id: 'question'});
    
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++)
	  {
           if (selections[i] === questions[i].correctAnswer)
		   {
                numCorrect++;
           }
      }
    
      score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' Correct!!!');
     return score;
  }
})();
