// JavaScript Document
		var timerObject;
		var messageIds = 0;
		
		function startServerDataCallback(){
			getMessage();
			timerObject = setTimeout('startServerDataCallback()',3000);
		}
		
		startServerDataCallback();
		
		
		
		
		
		
		function sendMessage(){
			
			if(document.getElementById("message-input").value == "")
			{
				alert("enter text before sending");
			}
			else
			{
				console.log("SEND MESSAGES\n");
				
				// Make a variable that will hold our HTTP connection object
				var xmlhttp;
				
				// Initialize object for IE7 and up, and other modern browsers
				if (window.XMLHttpRequest){
					xmlhttp=new XMLHttpRequest();
				}
				// Or, initialize object for IE 6 and 5
				else{
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				
				var queryText = "sendMessage.php?newMessage=" + document.getElementById("message-input").value;
				document.getElementById("message-input").value = "";
				// Send a get request for any new messages
				xmlhttp.open("GET",queryText,true);
				// Then send the message.
				xmlhttp.send();
				
				xmlhttp.onreadystatechange= function() {
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						getMessage();
					}
				};
			}
			
		}
	
		function getMessage(){
			console.log("GET MESSAGES\n");
			
			// Make a variable that will hold our HTTP connection object
			var xmlhttp;
			
			// Initialize object for IE7 and up, and other modern browsers
			if (window.XMLHttpRequest){
				xmlhttp=new XMLHttpRequest();
			}
			// Or, initialize object for IE 6 and 5
			else{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			var queryText = "getMessage.php?getMessagesAfterLine=" + messageIds;
			
			// Send a get request for any new messages
			xmlhttp.open("GET",queryText,true);
			// Then send the message.
			xmlhttp.send();
			
			
			// Now we write code to handle any response from the server, done in the 
			// onreadystatechange function you define like this..
			xmlhttp.onreadystatechange= function() {
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					// The readyState==4 and status=200 are HTTP codes.
					// If your status=404 the page is missing.
					//console.log("Known id: " + messageIds + "responseText: " + xmlhttp.responseText);
					//document.getElementById("message-output").innerHTML += xmlhttp.responseText;
					var myArr = JSON.parse(xmlhttp.responseText);
					for (var i = 0; i < myArr.length; i++) {
						//console.log("My id: " + messageIds + " and the rows id: " + myArr[i][0]);
						if(messageIds < parseInt(myArr[i][0]) ){
							//console.log("Add up one");
							messageIds = myArr[i][0];
							//console.log("message: " + myArr[i]);
							var outputDiv = document.getElementById("message-output");
							outputDiv.innerHTML += '<p class="well">' + myArr[i][1] + " <sub>(" + myArr[i][2] +  ")</sub></p>";
							outputDiv.scrollTop = outputDiv.scrollHeight;
							
						}
					}
					//document.getElementById("message-output").innerHTML += '<p class="well">' + xmlhttp.responseText + '</p>';
				}
				else{
					// Handle if something went wrong getting the server response.
					//document.getElementById("message-output").innerHTML = "Error getting data from server! HTTP.status=" + xmlhttp.status + " and .readyState = " + xmlhttp.readyState;
				}
			};
		}
		