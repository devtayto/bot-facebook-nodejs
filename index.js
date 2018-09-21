var request = require("request");
var facebook = require("facebook-chat-api");

facebook(
    {
    email: "devtayto.com@gmail.com",
    password: "devtayto"
    },
    function callback(err,api)
    {

        api.listen(
            function callback(err, message)
            {
                // request API  API https://devtayto.com/tool/simsimi.php?text=noi dung and parse json 
                // message.body get message from facebook 
                request("https://devtayto.com/tool/simsimi.php?text="+encodeURI(message.body),
                function(error, response, body)
                {
                    // parse json from API
                    var text = JSON.parse(body);
                    // check status
                    if(text.msg == "OK.")
                    {
                        // get respSentence from json 
                        var messagerep = text.response;
                        // send message
                        api.sendMessage(messagerep,message.threadID);
                    }
                    else
                    api.sendMessage("CHẢ HIỂU CHI MÔ",message.threadID);
                }
            
            
            );
                
            }

        );
    }
);