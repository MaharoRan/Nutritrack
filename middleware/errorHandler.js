const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode? res.statusCode :500;
    switch (statusCode) {
        case 400:
            res.json({title:'Field Validation Failed', message:err.message, stacktrace: err.stack});
            break;
         case 404:
            res.json({title:'Not Found', message:err.message, stacktrace: err.stack});
            break;
        default:
            console.log("No Error");
            break;
    }
    
};

module.exports=errorHandler;