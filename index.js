const express = require('express');
const app = express();
const path = require('path')

const axios = require('axios')
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.listen(8080, function () {
    console.log('listening...')
})
app.get('/', function (req, res) {
    res.render('home')
})

app.get('/search', function (req, res) {
    const value = req.query.crypto_name
    axios.get(`https://api.coinranking.com/v2/coins?search=${value}`)
        .then(function (response) {
            // handle success
            let count = 0
            const coins = response.data.data.coins;
            res.render('search.ejs', { coins, value, count })
        })
        .catch(function (error) {
            // handle error
            res.send('<h3> SOME THING WENT  \n' + error + '</h3>')
        })
})
app.get('/buycrypto/:name', function (req, res) {
    const { name } = req.params
    console.log(name)
    axios.get(`https://api.coinranking.com/v2/coins?search=${name}`)
        .then(function (response) {
            // handle success
            let count = 0
            const coins = response.data.data.coins;
            console.log(coins[0])
            res.render('buyCrypto.ejs', { coins, count, name })
        })
        .catch(function (error) {
            // handle error
            res.send('<h3> SOME THING WENT  \n' + error + '</h3>')
        })
})
