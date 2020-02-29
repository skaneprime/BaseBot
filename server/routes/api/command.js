const express = require('express');
const fs = require('fs');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');
const replace = require('replace-in-file');
// Get Posts
// router.get

let parser = bodyParser.urlencoded({ type: 'application/x-www-form-urlencoded'});


router.all(/.*/, parser, async (req, res) => {
    try {
        console.log(`Ok`);
        if(req.method != "POST") return res.end(`ONLY POST REQUEST`)
        res.setHeader('Content-Type', 'application/json', 'charset=utf-8');
        let urlarray = req.url.split("/").slice(1);
        let str = 'false';
        if(urlarray[0] === "create") {
            let command = req.body;
            if(!command.name) return res.json({ ERROR: "Enter name of command" })
            
        }
        if(urlarray[0] === "update") {
            let command = req.body;
            let oldcommand = client.commands.find(cmdClass => cmdClass.name === command.name || cmdClass.aliases.includes(command.name))
            if(!oldcommand) return;
            let newcommand = oldcommand;
            Object.keys(command).forEach(key => {
                if(oldcommand[key]) {
                    if(['true', 'false'].includes(command[key])) {
                        command[key] = command[key] == 'true' ? true : false;
                        return newcommand[key] = command[key];
                    } 
                    newcommand[key] = command[key];
                }
            })
            console.log(__dirname);
            Object.keys(newcommand).forEach(async item => {
                if(item === "execute" || item === "category") return;
                let options = {
                    files: `G:\\MYPROJECTS\\BaseBot\\commands\\${oldcommand.category}\\${command.name}.js`,
                    
                    from: oldcommand[item],
                    to: newcommand[item]
                }

                if(item === "guildOnly" || item === "invicible")
                    options = {
                        files: `G:\\MYPROJECTS\\BaseBot\\commands\\${oldcommand.category}\\${command.name}.js`,
                        from: `${name}: ${oldcommand[item]}`,
                        to: `${name}: ${newcommand[item]}`
                    }
                await replace(options, (error, changedFiles) => {
                    if(error) cmd.error(error);
                        console.log(`UPDATED: [FROM : ${options.from} || TO : ${options.to}]  \n ${changedFiles[0].hasChanged}`)
                });
            })
            setTimeout(() => {
                console.log(oldcommand['aliases']);
                console.log(newcommand['aliases']);
            }, 1000);
            
            res.json(command)
        }
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

module.exports = router;

