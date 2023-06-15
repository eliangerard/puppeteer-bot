const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const puppeteer = require('puppeteer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goto')
		.setDescription('Opens a new page in the browser')
        .addStringOption(option => option.setName('link').setDescription('The link to go to').setRequired(true)),
	async execute(interaction, client) {
        const link = interaction.options.getString('link');

		if(!client.browser)
            client.browser = await puppeteer.launch({ 
                headless: true,
                executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
                args: ['--start-maximized']
            });

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