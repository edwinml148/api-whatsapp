const { createBot, createFlow, MemoryDB, createProvider, addKeyword } = require('@bot-whatsapp/bot');
const { BaileysProvider, handleCtx } = require('@bot-whatsapp/provider-baileys');

const flowBienvenida = addKeyword('hola').addAnswer('Esto es una prueba ....!');

const main = async () => {
    const provider = createProvider(BaileysProvider);

    provider.initHttpServer(3002);

    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const body = req.body;
        const message = body.message;
        const phone = body.phone;
        await bot.sendMessage(phone, message, {});
        res.end('Esto es un server de polka');
    }));

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    });
};

main();