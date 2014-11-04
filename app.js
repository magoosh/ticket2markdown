//TO DO: Activate on button click --DONE!
//TO DO: Put inside nice textbox with modal --DONE!
//TO DO: Figure out clever way to remove first "undefined line" --DONE!
//TO DO: Fixed 'undefined' error --DONE.
//TO DO: Deploy to zendesk
//TO DO (later): Check box (ex. check here to extract ENTIRE ticket and not just Magoosh answers)

(function() {

  return {

    defaultState: 'button',

    events: {
      'app.activated'            : 'init',
      'click .theButton'         : 'getInfo',

      'relatedInfoSettings.done' : 'showInfo',
      'relatedInfoSettings.fail' : 'showError',

      'hidden .my_modal'         : 'showButton'
    },

    requests: {
      // Example tickets:
      // Complicated ticket:     55911
      // Straightforward ticket: 61418

      relatedInfoSettings: function(id) {
        return {
          url: '/api/v2/tickets/' + id + '/comments.json',
          type:'GET',
          dataType: 'json'
        };
      }
    },

    init: function(){
      // nothing to do
    },

    // show the widget with button
    showButton: function(){
      this.switchTo('button');
    },

    getInfo: function(){
      this.ajax('relatedInfoSettings', this.ticket().id());
    },

    showInfo: function(data) {
      console.log(data)

      //here I think we can process this here and then just fill up a single textarea

      var theData, object;

      // Cycle through all the comments
      for (var i = 0; i < data.comments.length; i++) { 
        object = data.comments[i];

        /*
         * Check to make sure the comment comes from a Zendesk agent. There's no
         * flag in the JSON to check with 100% certainty in each time so for the
         * moment use two-layer check:
         *
         * 1. We check the comment.source.rel and if rel == null, then it's very
         *    likely an agent
         * 2. But if student replies their comment.source.rel = null so we want
         *    to check the object.via.source.from.address and if that's blank or
         *    undefined then it IS an agent. If it has a value it's a student.
         *
         * Good request for Zendesk: Add a flag in the API to specify if a reply
         * is an agent or not.
         */

        var checkAgent = object.via.source.rel;
        var checkAgentReply = object.via.source.from.address;

        if (checkAgent == null) {
          if (!checkAgentReply) {
            console.log(i +":" + theData);

            if (theData == undefined){
              theData = object.body;
            } else {
              theData = theData + "\n\n##_____________________________##\n\n" + object.body;
            }
          }
        }
      }

      var passer = {"theText":theData}; //Make the string an object so we can pass it into the modal

      this.switchTo('modal', passer);
      this.$('.my_modal').modal({
        backdrop: true,
        keyboard: false
      });

    },


    showError: function() {
      this.switchTo('error');
    }

  };

}());
