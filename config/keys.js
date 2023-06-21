if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}

//prod
//mongoURI:'mongodb+srv://miknapsack:miKnapsack123!@knapsack.nfmaprb.mongodb.net/?retryWrites=true&w=majority'
