function lesMessages(){
   $.ajax({
		url: '/api/message.json',
		dataType: 'json'
	}).success(function(messages) {
		console.log(messages);
		visMessages(messages);
	}).error(function(error) {
		console.log("error fetching json file");
	});
}
function visMessages(data){
	
	for(key in data['message']){
		
		//console.log(data['message'][key].replies.length);
		
		
		//add messages to forum thread
		if(data['message'][key].messageType == 'parent'){
			console.log(data['message'][key].messageText);
			var messageContent = '<div class="panel panel-default" style="margin-left: 15px; margin-right: 15px" id="chatbox">';
			messageContent += '<div class="panel-heading">';
			messageContent += '<h3 class="panel-title">';
			messageContent += data['message'][key].messageSenderUserName;
			messageContent += '</h3>';
			messageContent += '</div>';
			messageContent += '<div class="panel-body">';
			messageContent += '<div class="row">';
			messageContent += '<div class="col-md-2">';
			messageContent += '<img src="http://placehold.it/140x140" class="img-rounded" style="width: 50px; height: 50px">';
			messageContent += '</div>';
			messageContent += '<div class="col-md-10">';
			messageContent += '</div>';
			messageContent += data['message'][key].messageText;
			messageContent += '</div>';
			messageContent += '</div>';
			messageContent += '</div>';
			messageContent += '<hr>';
			//add message replies to forum
			$('#messageDiv').append(messageContent);
			for(i = 0; i<data['message'][key]['replies'].length; i++){
				//console.log(data['message'][key]['replies'][i].messageID)
				for(keyss in data['message']){
					if(data['message'][keyss].messageID == data['message'][key]['replies'][i].messageID){
						//console.log(data['message'][keyss].messageID)
						var messageReply = '<div class="panel panel-default" style="margin-left: 50px; margin-right: 15px" id="chatbox">';
						messageReply += '<div class="panel-heading">';
						messageReply += '<h3 class="panel-title">';
						messageReply += data['message'][keyss].messageSenderUserName;
						messageReply += '</h3>';
						messageReply += '</div>';
						messageReply += '<div class="panel-body">';
						messageReply += '<div class="row">';
						messageReply += '<div class="col-md-2">';
						messageReply += '<img src="http://placehold.it/140x140" class="img-rounded" style="width: 50px; height: 50px">';
						messageReply += '</div>';
						messageReply += '<div class="col-md-10">';
						messageReply += '</div>';
						messageReply += data['message'][keyss].messageText;
						messageReply += '</div>';
						messageReply += '</div>';
						messageReply += '</div>';
						messageReply += '<hr>';
						//add message replies to forum
						$('#messageDiv').append(messageReply);
					}
				}		
			}						
		}				
	}
}
