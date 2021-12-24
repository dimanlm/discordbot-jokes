const axios = require('axios');
const fs = require('fs');
const { TRANSLATE_TOKEN } = require('../data/config.json');

module.exports = {
    /**
     * Allows a user to translate messeges to any available language
     */
    msgTranslation: function (client, message){
        // First, we retrieve the language in which the user wants to see the jokes
        let language = JSON.parse(fs.readFileSync("./data/language.json"));
        // if the language.json file is empty, a default language is English
        if (!language[client.guild.id]){
            language[client.guild.id] = {
                language: 'en'
            };
        }
        let LANG = language[client.guild.id].language;

        // If language != default (English)
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
                client.reply(response.data[0].translations[0].text);
            }).catch(function (error) {
                console.error(error);

                let prefixes = JSON.parse(fs.readFileSync("./data/prefix.json"));
                if (!prefixes[client.guild.id]){
                    prefixes[client.guild.id] = {
                        prefixes: '%'
                    };
                }
                let prefix = prefixes[client.guild.id].prefixes;            

                client.reply('Sorry, I could not translate the joke. Type `' + prefix + 'lang` to see the available languages.');
            });
        }else{
            client.reply(message);
        }
    },

    /**
     * Sends a message with a list of all available languages
    */
    getAvailableLanguages: function(client) {
        // microsoft translator api
        var options = {
            method: 'GET',
            url: 'https://microsoft-translator-text.p.rapidapi.com/languages',
            params: {'api-version': '3.0', scope: 'translation'},
            headers: {
              'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
              'x-rapidapi-key': '104c81be59mshc6291640551b9dcp18c234jsn146970f19721'
            },
            json: true
        };

        /*** 
         * this functions parses the data object to find the language name and reply with a list of languages
         * microsoft's get method returns us a json structured like:
         *      {
                    "translation":{
                        "af":{
                        "name":"Afrikaans"
                        "nativeName":"Afrikaans"
                        "dir":"ltr"
                        }
                        ...
                        ...
                    }
                }
        */
        const availableLang = function(data) {
            var langList = ' ';
            // parse the data object
            for (var translation in data) {
                for (var langShort in data[translation]) { // langShort: af, en, fr, es, etc
                    var langName = data[translation][langShort].name;
                    langList = langList + '\n' + langName + ': **' + langShort + '**';
                };
            };  
            client.reply(langList);
        }
        
        // send the request and get the response data
        axios.request(options).then(function (response) {
            console.log(response.data.translations)
            const data = response.data;
            return data
        }).then(availableLang) // call the availableLang function to parse the returned data
        .catch(function (error) {
            console.error(error);
        });
    }
}