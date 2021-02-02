const UrlModel = require('../models/url-model.js');

module.exports = {
  async getAllUrls(req, res, next) {
    try {
      const urlsData = await UrlModel.find({}, { __v:0 }).sort( { createdDate: -1 } );
      res.send(urlsData.map(item => {
        return item._doc;
      }));
    } catch (error) {
      next(error);
    }
  },
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
        ...urlData._doc
      });
    } catch (error) {
      next(error);
    }
  },
  async getFullUrl(req, res, next) {
    const shortUrl = req.params.shortUrl;
    try {
      if (!shortUrl) {
        throw new Error('Short URL is required');
      }
      const urlData = await UrlModel.findOne({ shortUrl }, { fullUrl:1 });
      if (!urlData) {
        throw new Error('No URL data found');
      }
      res.redirect(urlData.fullUrl);
    } catch (error) {
      next(error);
    }
  }
};