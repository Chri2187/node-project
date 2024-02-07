const axios = require('axios');
require('dotenv').config();

const getSong = async (req, res) => {
    try {
        // Chiamata per TOKEN-V1
        const token = await axios.get(
            `http://localhost:${process.env.AUTH_PORT}/access-token`
        );
        // Chiamata per ottenere il numero totale di pezzi musicali
        const response = await axios.get(
            `http://localhost:${process.env.SONGS_PORT}/count`,
            {
                headers: token.data,
            }
        );
        const totalCount = response.data.count;

        const limit = 500;
        // offset deve fare dei salti da 500 fino a totalCount
        const offsetCnt = Array.from([0, 1, 2, 3], (i) => i * limit);

        // array per tutte le song
        let allSongs = [];
        // ciclo la chiamata per recuperare tutte le song su base offset/limit
        for (const offset of offsetCnt) {
            const songsResponse = await axios.get('http://localhost:9009', {
                params: {
                    offset: offset,
                    limit: limit,
                },
                headers: token.data,
            });
            // popolo l'array
            allSongs = allSongs.concat(songsResponse.data);
        }

        // ora ho tutte le song e divido per genere
        const generi = [];

        allSongs.forEach((el) => {
            // recupero tutti i generi
            const checkGenereIdx = generi.findIndex(
                (genre) => genre.genre === el.genre
            );
            if (checkGenereIdx === -1) {
                // controllo se esiste, se no lo aggiungo a generi
                generi.push({ genre: el.genre, songs: [el] });
            } else {
                // se esiste aggiungo le song
                generi[checkGenereIdx].songs.push(el);
            }
        });

        res.status(200).json(generi);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = getSong;
