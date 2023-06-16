const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const puppeteer = require('puppeteer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goto')
		.setDescription('Opens a new page in the browser')
        .addStringOption(option => option.setName('link').setDescription('The link to go to').setRequired(true))
        .addBooleanOption(option => option.setName('new').setDescription('If the page will open on a new tab').setRequired(false)),
	async execute(interaction, client) {
        const link = interaction.options.getString('link');
        const newTab = interaction.options.getBoolean('new');

		if(!client.browser){
            if(client.config.browserPath.length > 0)
                client.browser = await puppeteer.launch({ 
                    headless: false,
                    executablePath: client.config.browserPath,
                    args: ['--start-maximized']
                });
            else
                client.browser = await puppeteer.launch({ 
                    headless: false,
                    args: ['--start-maximized']
                });
        }
        if(newTab || !client.browser.lastPage)
            client.browser.lastPage = await client.browser.newPage();

        await client.browser.lastPage.goto(link);
        await client.browser.lastPage.setViewport({ width : 0, height : 0});

		const embed = new EmbedBuilder()
                .setTitle("Listo")
                .setColor("#00FF00");

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });

	},
};