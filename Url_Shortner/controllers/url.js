const {nanoid} = require("nanoid");
const Url = require('../models/url');

async function handleGenerateShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(404).json({error: 'Url is required'})
    const shortID = nanoid(8);
    await Url.create({
        shortId: shortID,
        redirectedURL: body.url,
        visitHistory: [],
    });
    return res.render('home', {
        id: shortID,
    })
    return res.json({id: shortID});
}
async function handleGetShortUrl(req, res){
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        {shortId}, 
        {
        $push:{
        visitHistory: {
            timestamp: Date.now()
        }},
        $inc:
         { clicks: 1 }
    },);
    res.redirect(entry.redirectedURL);
}
module.exports = {
    handleGenerateShortUrl,
    handleGetShortUrl,
}