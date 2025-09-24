const {PrismaClient} = require("@prisma/client")
const logger = require("./logging")


const prisma = new PrismaClient({
  log:[
    {emit:"event", level:"query"},
    {emit:"event", level:"error"},
    {emit:"event", level:"info"},
    {emit:"event", level:"warn"},
  ]
});

prisma.$on("error", (e)=>{
  logger.error("Error: "+e.message)
})

prisma.$on("query", (e)=>{
  // logger.info("Params: "+e.params)
})


prisma.$on("info", (e)=>{
  // logger.info("info: "+e.message)
})

prisma.$on("warn", (e)=>{
  logger.warn("Warn: "+e.message)
})

module.exports = prisma