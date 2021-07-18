/***************************
 *          UROŠ           *
 *  DISCORD TIMETABLE BOT  *
 ***************************/
// Invite link:
// https://discord.com/api/oauth2/authorize?client_id=770964922720321546&permissions=8&scope=bot

const Discord = require('discord.js');
const bot = new Discord.Client();
const client = bot; // alias
const fs = require('fs'); // FILE SYSTEM
require('dotenv').config({path: __dirname + '/.env'}); // env variables (client secret)
const fetch = require('node-fetch'); // to fetch timetable and moodle events
const moment = require('moment-timezone') // praise devs who work with time

TESTING_CHANNEL = process.env["TESTING_CHANNEL"];
if (!TESTING_CHANNEL) console.log("Missing TESTING_CHANNEL");
NOTIFICATION_CHANNEL = process.env["NOTIFICATION_CHANNEL"];
if (!NOTIFICATION_CHANNEL) console.log("Missing NOTIFICATION_CHANNEL");
notification_backup = NOTIFICATION_CHANNEL; // this is used to restore from testing mode (when NOTIFICATION_CHANNEL is set to equal TESTING_CHANNEL)

// if running multiple instances, use this ID to differentiate between them
CLIENT_ID = process.env["CLIENT_ID"];
if (!CLIENT_ID) console.log("Missing CLIENT_ID");

// the userid that may use direct eval()
ADMIN_ID = process.env["ADMIN_ID"];
if (!ADMIN_ID) console.log("Missing ADMIN_ID");

// prefix used for direct eval()
PREFIX = process.env["PREFIX"];
if (!PREFIX) console.log("Missing PREFIX");

function testing(enable) {
	const testing = bot.channels.get(TESTING_CHANNEL);
	if (enable) {
		NOTIFICATION_CHANNEL = TESTING_CHANNEL;
		testing.send("Testing mode enabled.");
		bot.user.setActivity("MAINTENANCE MODE");
	}
	else {
		NOTIFICATION_CHANNEL = notification_backup;
		testing.send("Testing mode disabled.");
		bot.user.setActivity("");
	}
}

bot.on("message", function(message) {
	// DEBUG:
	// if the message is from me and starts with %, eval() the message
	// and send the output back to the same channel
	if (message.author.id === ADMIN_ID && message.content.indexOf(PREFIX) === 0) {
		try {
			// if the message is in ```code blocks```, supress the return value
			if (message.content.indexOf("```") != 1) {
				message.channel.send("```"+eval(message.content.substring(PREFIX.length))+"```")
					.catch((e)=>{console.log(e)})
			}
			else {
				// log the return value to the console instead
				console.log(eval(message.content.slice(PREFIX.length + 3, -3)));
			}
			return;
		}
		catch(e) {
			message.channel.send("```"+e+"```")
				.catch((e)=>{console.log(e)})
			return;
		}
	}

	// @Uros ping
	if (message.guild !== null && message.isMentioned(bot.user)) {
		message.react("🥳")
			.catch((e)=>{console.log(e)})
		message.channel.send("I heard my name!")
			.catch((e)=>{console.log(e)})

		if (Math.floor(Math.random() * 100) == 0)
			// super rare event!
			message.author.send("yuo are sexy");

		return;
	}

	if (message.author.id == 763366736586080257 && message.channel.id == 763127734536372226) {
		message.react("\u2702") // scissors
			.catch((e)=>{console.log(e)})
	}
});

bot.on('ready', function() {
	console.log('Ready!'); // bot initialization complete
});

console.log("Waking up ...");
bot.login(process.env["CLIENT_SECRET"]).then(() => {
	console.log("Logged in alright"); // didn't crash (yet)
});
