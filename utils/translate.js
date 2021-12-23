const axios = require('axios');
const { LANG } = require('../data/language.json');
const { TRANSLATE_TOKEN } = require('../data/config.json');

module.exports = {
    jokeTranslation: function (client, message){
        if (LANG!=='en'){
            var options = {
                method: 'POST',
                url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
                params: {'api-version': '3.0', to: LANG, textType: 'plain', profanityAction: 'NoAction'},
                headers: {
                    'content-type': 'application/json',
                    'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
                    'x-rapidapi-key': TRANSLATE_TOKEN
                },
                data: [{Text: message}],
                json: true
            };
            
            axios.request(options).then(function (response) {
                console.log(response.data[0].translations[0].text);
                client.reply(response.data[0].translations[0].text);
            }).catch(function (error) {
                console.error(error);
                client.reply("Sorry, I could not translate the joke.");
            });
        }else{
            client.reply(message);
        }
    }
}