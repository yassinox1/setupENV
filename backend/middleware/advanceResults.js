const advanceResults = (model,populate)=>async(req,res,next)=>{
    let query;

        // Copy req.query
        const reqQuery = {...req.query}; 


        const FieldsToRemove = ['select', 'sort','limit','page'];

        FieldsToRemove.forEach(params => delete reqQuery[params]);

        
        // Create query String
        let queryStr = JSON.stringify(reqQuery);

        // Create Operatots ($gt, $gte)
        queryStr  = queryStr.replace(/\b(gt|gte|lt|lt|in)\b/g,match =>`$${match}`);;

        query = model.find(JSON.parse(queryStr));

        if(req.query.select){
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields)
        }

        // Srot
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query=query.sort('-name');
        }

        // Pagination
        const page = parseInt(req.query.page,10) || 1;
        const limit = parseInt(req.query.limit,10) || 10;

        const startIndex = (page -1) * limit;
        const endIndex = page * limit;
        const total = await model.countDocuments();

        query = query.skip(startIndex).limit(limit);

        if(populate){
            query = query.populate(populate);
        }

        // Executing Query
        const results = await query;

        //Pagination Result
        const pagination = {};

        if(endIndex < total){
            pagination.next = {
                page : page + 1,
                limit 
            }
        }

        if(startIndex > 0){
            pagination.prev = {
                page : page - 1,
                limit 
            }
        }

        res.advanceResults ={
            success : true,
            count : results.length,
            pagination,
            data: results
        }
        next();

}

module.exports = advanceResults;