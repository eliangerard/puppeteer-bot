const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const puppeteer = require('puppeteer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('write')
		.setDescription('Writes a text in the browser')
        .addStringOption(option => option.setName('text').setDescription('The text to write').setRequired(true))
        .addStringOption(option => option.setName('selector').setDescription('The ID based css selector "#myID"').setRequired(false)),
	async execute(interaction, client) {
        const selector = interaction.options.getString('selector');
        const text = interaction.options.getString('text');

		if(!client.browser)
            client.browser = await puppeteer.launch({ headless: false });
        if(selector)
            await client.browser.lastPage.type(selector, text);
        else 
            await client.browser.lastPage.keyboard.type(key);

		const embed = new EmbedBuilder()
                .setTitle("Written "+text)
                .setColor("#00FF00");

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });

	},
};