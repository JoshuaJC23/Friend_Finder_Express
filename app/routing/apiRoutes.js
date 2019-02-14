
var friendsList = require("../data/friends");

module.exports = function(app){
app.get("/api/friends", function(req, res){
    return res.json(friendsList);
});

app.post("/api/friends", function(req, res){
    var userInput = req.body;
    userInput.scores = userInput.scores.map(x=>parseInt(x));
    friendsList.push(userInput);

    console.log(friendsList);
    // var userResponse = userInput.scores;    

    var matchName = "";
    var matchImage = "";
    var totalDifference = 100;

    for( var i = 0; i < friendsList.length; i++){
        var difference = [];

        for(var j = 0; j < 10; j++){
            difference += Math.abs(userInput.scores[j] - friendsList[i].scores[j]);
         }
         if(difference < totalDifference){
             totalDifference = difference;
             matchName = friendsList[i].name;
             matchImage = friendsList[i].photo
         }


    }

    res.json({
        matchName,
        matchImage
    })
})
};
