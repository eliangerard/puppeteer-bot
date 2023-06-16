const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const puppeteer = require('puppeteer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('press')
		.setDescription('Press a keyboard key')
        .addStringOption(option => option.setName('key').setDescription('The keyboard key to press').setRequired(true)),
	async execute(interaction, client) {
        const key = interaction.options.getString('key');

		if(!client.browser) {
            const embed = new EmbedBuilder()
                    .setTitle("There is no open browser")
                    .setColor("#FF0000");
    
            return interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }

        await client.browser.lastPage.keyboard.press(key);

		const embed = new EmbedBuilder()
                .setTitle("Pressed "+key)
                .setColor("#00FF00");

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });

	},
};