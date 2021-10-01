const path = require("path");
const urls = require(path.resolve("src/data/urls-data"));
const uses = require(path.resolve("src/data/uses-data"))
const newUrlId = urls.length + 1;
const newUseId = uses.length + 1;

//middle
const hasHref = (req, res, next) => {
    const { data: { href } = {} } = req.body;
    if (href) {
      return next();
    }
    return next({ status: 400, message: "the 'href' property is missing." });
  };

  const urlExists = (req, res, next) => {
    const urlId = Number(req.params.urlId);
    const foundUrl = urls.find((url) => url.id === urlId);
    
    if (foundUrl) {
        res.locals.url = foundUrl
      return next();
    } else {
      return next({
        status: 404,
        message: `URL id not found: ${req.params.urlId}`,
      });
    }
  };




//used for PUT on URLS/:urlid
  function update(req, res) {
    originalResult=res.locals.url
  
    
  
    const { data } = ({} = req.body);
  
    if (originalResult !== data) {
      // update the note
  
      originalResult = data;
   }
  
    res.json({ data: originalResult });
  }







//used for post URLS/:urlId
const read = (req, res, next) => {
    
    
    const newUse = {
        id:newUseId,
       urlId:res.locals.url.id,
       time:Date.now()}

      uses.push(newUse)


    res.json({ data: res.locals.url });
  };
//used for post URLS
const create = (req, res, next) => {
    const { data: { href } = {} } = req.body;
console.log(href)
    const newUrl = {
      href: href, 
      id:newUrlId,
    };


  

    
    urls.push(newUrl);

    res.status(201).json({ data: newUrl });
  };
//used for get URLS
function list(req, res) {
    const { urlId } = req.params;
    let copyUrls = [...urls]

    if(urlId){

    copyUrls.filter((u) => {
     
            return u.urlId === Number(urlId)}
            )
    }
   res.json({ data: copyUrls });
  }


  module.exports = {
   create:[hasHref, create],
    list,
    read: [urlExists, read],
    update: [urlExists, update],
    urlExists
      }

 