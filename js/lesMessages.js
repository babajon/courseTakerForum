function lesMessages(threadID){
   $.ajax({
		url: '/api/message.json',
		dataType: 'json'
	}).success(function(messages) {
		console.log(messages);
		visMessages(messages,threadID);
	}).error(function(error) {
		console.log("error fetching json file");
	});
}
function visMessages(data,threadID){
	
	for(key in data['message']){
		console.log(data['message'][key].threadID)
		//console.log(data['message'][key].replies.length);
		
		
		//add messages to forum thread, should check if message belongs to this thread. 
		//But not for now, becasue of limited messages are made
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
			
			//go through replies and post them
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
function getThreads(){
	 $.ajax({
		url: '/api/thread.json',
		dataType: 'json'
	}).success(function(threads) {
		console.log(threads);
		fillThreads(threads);
	}).error(function(error) {
		console.log("error fetching json file");
	});
}
function fillThreads(data){
	for(key in data['thread']){
		var threadContent = '<div class="panel panel-default style="margin-left: 15px; margin-right: 15px" id="chatbox">';
		threadContent += ' <div class="panel-body">';
		
		threadContent += data['thread'][key].threadTitle;	
		threadContent +='<a href="/pages/thread.html?' + 'thread_id='+ data['thread'][key].threadID +'"'; 
		threadContent += 'class="btn btn-info pull-right" role="button">Go to discussion</a>';
		
		threadContent += '</div>';
		threadContent += '</div>';
		
		$('#threadDiv').append(threadContent);
	}
}
function getURLParameter(url, parameter_key)
{
	var url_query_string = url.search.substring(1);
	var url_variables = url_query_string.split('&');

	for (var i = 0; i < url_variables.length; i++)
	{
		var pair = url_variables[i].split('=');
		if (pair[0] == parameter_key)
		{
			return pair[1];
		}
	}
}