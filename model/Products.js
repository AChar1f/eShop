import { connection as db } from '../config/index.js'

class Products {
    fetchProducts(req, res) {
        try {
            const strQry = `
            select productID, prodName, category, prodDescription, prodURL, amount 
            from Products;
            `
            db.query(strQry, (err, results) => {
                if(err) throw new Error('Issue when retrieving all products')
            res.json({
                status: res.statusCode,
                results
            })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    fetchProduct(req, res) {
        try {
            const strQry = `
            select productID, prodName, category, prodDescription, amount 
            from Products
            where productID = ${req.params.productID}; 
            `
            db.query(strQry, (err, result) => {
                if(err) throw new Error('Issue when retrieving product data.')
                res.json({
                    status: res.statusCode,
                    result: result[0]
                })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    recentProducts(req , res) {
        try {
            const strQry = `
            select productID, prodName, category, prodDescription, prodURL, amount 
            from Products
            order by productID desc
            limit 5;
            `
           db.query(strQry, (err, results) => {
            if(err) throw new Error('Unable to fetch recent product data.')
            res.json({
                status: res.statusCode,
                results
            })
           }) 
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    async addProduct(req, res) {
        try {
            let data = req.body
            const strQry = `
            insert into Products
            set ?;
            `
            db.query(strQry, [data], (err) => {
                if(err) throw new Error('Unable to add product')
                res.json({
                    status: res.statusCode,
                    msg: 'Product added successfully.'
                })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    async updateProduct(req, res) {
        try {
            let data = req.body
            const strQry = `
            update Products
            set ? 
            where productID = ${req.params.id}
            `
            db.query(strQry, [data], (err) => {
                if(err) throw new Error('Unable to update product.')
                res.json({
                    status: res.statusCode,
                    msg: 'Product details updated successfully 🔃.'
                })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    deleteProduct(req, res) {
        try {
            const strQry = ` 
            delete from Products
            where productID = ${req.params.id}
            `
            db.query(strQry, (err) => {
                if(err) throw new Error('Ran into issues while trying to delete product, please review delete query.')
            res.json({
                status: res.statusCode,
                msg: 'Successfully deleted product information.'
            })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
}

export {
    Products
}