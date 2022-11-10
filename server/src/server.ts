import express from "express";
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinute } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesStringToHour } from "./utils/convert-minutes-string-to-hour";
import cors from 'cors'



const app = express();


app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/games', async (req, resp) => {

    const games = await prisma.game.findMany(
        {
            include: {
                _count: {
                    select: {
                        ads: true,
                    }
                }
            }
        }
    );
    return resp.json(games)
})
/*
http code status
os que começa com 1: exemplo 100 - são de informativo
os que começa com 2: exemplo 200 - são de sucessos
os que começa com 3: exemplo 300 - são de redirecionamento
os que começa com 4: exemplo 400 - são de erros client
os que começa com 5: exemplo 500 - são de erros server
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
*/
app.post('/games/:id/ads', async (req, resp) => {
    const gameId = req.params.id;
    const body : any = req.body;
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name:         body.name,
            yearsPlaying: body.yearsPlaying,
            discord:      body.discord,
            weekDays:     body.weekDays.join(','),
            hourStart: convertHourStringToMinute(body.hourStart),
            hourEnd:   convertHourStringToMinute(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })
    return resp.status(201).json(ad);
});

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart:convertMinutesStringToHour(ad.hourStart),
            hourEnd:convertMinutesStringToHour(ad.hourEnd),
        }
    }))
})
app.get('/ads/:id/discord', async (req, res) => {
    //const gameId = req.params.id;
    const adId = req.params.id
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        }, where: {
            id: adId,
        }
    });
    return res.json({ discord: ad.discord });
})

app.listen(3333);
