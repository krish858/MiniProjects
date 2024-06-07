const zod = require("zod");

const urlvalidation = zod.object({
    url: zod.string().url()
})

module.exports = { 
    urlvalidation: urlvalidation,
}