const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const puppeteer = require('puppeteer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('write')
		.setDescription('Writes a text in the browser')
        .addStringOption(option => option.setName('text').setDescription('The text to write').setRequired(true))
        .addStringOption(option => option.setName('selector').setDescription('The ID based css selector "#myID" of the element to write on').setRequired(false)),
	async execute(interaction, client) {
        const selector = interaction.options.getString('selector');
        const text = interaction.options.getString('text');

		if(!client.browser) {
            const embed = new EmbedBuilder()
                    .setTitle("There is no open browser")
                    .setColor("#FF0000");
    
            return interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        if(selector)
            await client.browser.lastPage.type(selector, text);
        else 
            await client.browser.lastPage.keyboard.type(text);

		const embed = new EmbedBuilder()
                .setTitle("Written "+text)
                .setColor("#00FF00");

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });

	},
};