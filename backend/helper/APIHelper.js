class APIHelper {
    constructor(query, queryStr) {
        this.query = query;         // Mongoose Query (e.g., Product.find())
        this.queryStr = queryStr;   // Query String from URL (e.g., req.query)
    }

    // 1. Search Functionality
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this; 
    }

    // 2. Filter Functionality (e.g., by Category)
    filter() {
        const queryCopy = { ...this.queryStr };

        // Fields to remove before filtering
        const removeFields = ["keyword", "page", "limit"];
        
        // Loop through and delete these fields from the query copy
        removeFields.forEach((key) => delete queryCopy[key]);

        // Find using the remaining fields (like { category: 'Mobile' })
        this.query = this.query.find(queryCopy);
        return this;
    }

    // 3. Pagination Functionality
    pagination(resultsPerPage) {
        // Get current page from URL, default to 1 if not provided
        const currentPage = Number(this.queryStr.page) || 1;
        
        // Calculate how many records to skip
        const skip = resultsPerPage * (currentPage - 1);

        // Apply limit and skip to the Mongoose query
        this.query = this.query.limit(resultsPerPage).skip(skip);
        
        return this;
    }
}

export default APIHelper;