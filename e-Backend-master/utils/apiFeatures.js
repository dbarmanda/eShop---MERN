/*      *** first time query search *****
What this basically does is if someone queries in url a name
        searches and returns that object

Using query we are making a whole lot of logical backend......
Just seee brother

1. 'search' -> 

2. 'filter' ->

3. 'pagination' ->
*/


class ApiFeatures {
                   
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    
    search (){
        //getting keyword from query Obj.
        const keyword = this.queryStr.keyword ? {
            //why regex: by default provides seraching capabilities
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",      //case insensitive
            },
        } : {
            //do nothing (returns null)
        };

        // console.log(keyword)       //spread-Operator
                                    /************ */
        this.query =  this.query.find({...keyword});
        return this;
    }

    filter(){
        //for category
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key)=> delete queryCopy[key]);

        // make the object a string for range
        let queryStr = JSON.stringify(queryCopy);
                            /**************** */
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key=> `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) ||1;

        const skipPages = resultPerPage * (currentPage - 1); // on page 1: 0 skip
                                                        // on page 2: 10 skip   // on page 3: 20 skip

        this.query = this.query.limit(resultPerPage).skip(skipPages);

        return this;
    }

}

module.exports = ApiFeatures;