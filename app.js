(function() {

  return {

//TO DO: Activate on button click --DONE!

//TO DO: Put inside nice textbox with modal --DONE!

//TO DO: Figure out clever way to remove first "undefined line" --DONE!

//TO DO: Fixed 'undefined' error --DONE.

//TO DO: Deploy to zendesk

//TO DO (later): Check box (ex. check here to extract ENTIRE ticket and not just Magoosh answers)



    events: {

    	'app.activated':'init',

    	'click .theButton': 'getInfo',

      //'app.activated':'getInfo',


    },


    requests: {

    //Complicated ticket: 55911

    //Straightforward ticket: 61418

	  relatedInfoSettings: function(id) {
	    return {
	      url: '/api/v2/tickets/' + id + '/comments.json',
	      type:'GET',
	      dataType: 'json'
	    };
	  }

	},

	init: function(){


	},

    showInfo: function(data) {

    	  console.log(data)


    	  //here I think we can process this here and then just fill up a single textarea

    	 var theData;
		//Cycle through all the comments
		for (var i = 0; i < data.comments.length; i++) { 

					var object = data.comments[i];

					//Check to make sure the comment comes from a Zendesk agent. There's no flag in the JSON to check with 100% certainty in each time so for the moment use two-layer check

					//We check the comment.source.rel and if rel == null, then it's very likely an agent

					//But if student replies their comment.source.rel = null so we want to check the object.via.source.from.address and if that's blank/undefined then it IS an agent-- if it has a value it is a student

					//Good ask for Zendesk: carry a flag in the API to specify if a reply is an agent or not

					var checkAgent = object.via.source.rel;

					var checkAgentReply = object.via.source.from.address;


					if (checkAgent == null){

						if(!checkAgentReply){

						    console.log(i +":" + theData)
							if (theData == undefined){
								theData = object.body;
							}else{
								theData = theData + "\n\n##_____________________________##\n\n" + object.body
							}


						  } //end checkAgentReply


					} //end checkAgent

        } //end loop

        var passer = {"theText":theData}; //Make the string an object so we can pass it into the modal

    	this.switchTo('requester', passer);


    	 this.switchTo('modal', passer);

		 this.$('.my_modal').modal({
		        backdrop: true,
		        keyboard: false
		      });  


    }, //end showInfo function


    showError: function() {

	  		this.switchTo('error');

	},

    getInfo: function(){
    	  services.notify('Fetching the raw markdown...');
    	  var id = this.ticket().id();
  		  var request = this.ajax('relatedInfoSettings', id);
		  request.done(this.showInfo);
		  request.fail(this.showError);



    } //end getInfo



  };

}());
