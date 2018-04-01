        $(document).ready(function() {
		
            $(document).mouseup(function() {
				$("#loginform").mouseup(function() {
					return false
				});
				
				$("a.close").click(function(e){
					e.preventDefault();
					$("#loginform").hide();
                    $(".lock").fadeIn();
				});
				
                if ($("#loginform").is(":hidden"))
                {
                    $(".lock").fadeOut();
                } else {
                    $(".lock").fadeIn();
                }				
				$("#loginform").toggle();
            });
			
			
			// I dont want this form be submitted
			$("form#signin").submit(function() {
//			var pwd = $.form.get(signin);
//			alert(pwd);
//				var queryString = $('signin').formSerialize(); 
 
				// the data could now be submitted using $.get, $.post, $.ajax, etc

			var queryString = $('#signin').formSerialize();
//			var pwd = $.form.get(signin).fieldSerialize(); 
//			alert(queryString);
				$.post('index.html', queryString); 
		
			  return true;
			});
			
			// This is example of other button
			$("input#cancel_submit").click(function(e) {
					$("#loginform").hide();
                    $(".lock").fadeIn();
			});			
			
			
        });