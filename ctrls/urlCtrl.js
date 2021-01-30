const UrlModel = require('../models/url-model.js');

module.exports = {
  async shortUrl(req, res, next) {
    const fullUrl = req.body.fullUrl;
    try {
      // find existing data
      let urlData = await UrlModel.findOne({ fullUrl });
      if (!urlData) {
        // create new short url
        urlData = await UrlModel.create({ fullUrl });
      }
      return res.send({
        fullUrl: urlData._doc.fullUrl,
        shortUrl: urlData._doc.shortUrl
      });
    } catch (error) {
      next(error);
    }
  }
};