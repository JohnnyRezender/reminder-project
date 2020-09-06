/**
 * Schedule para envio de alertas para o telegram
 * Banco de dados utilizado -> SQLite
 * Autor: Johhny Rezende & Vinicius Ramos
 */
require('dotenv').config();
//const connection    = require("./connection.ts");
const schedule      = require('node-schedule');
const TelegramBot   = require('node-telegram-bot-api');

//const token = '1317916738:AAHkccEiUPojeUQK25NoXOeFej7m1ma2i1M';
const token = process.env.API_TOKEN_TELEGRAM;
const chatId = process.env.CHATID_TELEGRAM;

// // Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });


var j = schedule.scheduleJob('*/1 * * * *', function () {
    // TODO: Implementar o código para buscar os alertas e definir o tempo de execução.
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Olá amigo');
});