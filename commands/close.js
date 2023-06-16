const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Close browser tab')
        .addIntegerOption(option => option.setName('position').setDescription('Tab to select (1 - X)').setRequired(false)),
    async execute(interaction, client) {
        let position = interaction.options.getInteger('position');

        if (!client.browser) {
            const embed = new EmbedBuilder()
                .setTitle("There is no open browser")
                .setColor("#FF0000");

            return interaction.editReply({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        const pages = await client.browser.pages();

        if (!position) {
            client.browser.lastPage.close();
            client.browser.lastPage = pages[pages.length - 1];
            const embed = new EmbedBuilder()
                .setTitle("Done")
                .setColor("#00FF00");

            return interaction.editReply({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }

        position--;
        if (position >= pages.length) {
            const embed = new EmbedBuilder()
                .setTitle(`The tab doesn't exist, (1 - ${pages.length})`)
                .setColor("#FF0000");

            return interaction.editReply({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        client.browser.lastPage = pages[position];
        pages[position].close();

        const embed = new EmbedBuilder()
            .setTitle("Done")
            .setColor("#00FF00");

        interaction.editReply({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
    },
};