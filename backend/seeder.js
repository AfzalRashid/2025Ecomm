const users= require('./data/users')
const products = require('./data/products')
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const connectDB = require('./config/db')
const dotenv = require('dotenv')

dotenv.config()
connectDB()

    
    async function importData (){

        try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser = await User.insertMany(users)
        const sampleProducts = products.map((product) => {return {... product, user: createdUser[0]._id}}
        )
        
        await Product.insertMany(sampleProducts)

        console.log("Data imported")
        process.exit()
        }
        catch(e){
            console.log(e)
            process.exit(1)
        }

    }


    async function destroyData () {
        try {
            await Order.deleteMany()
            await Product.deleteMany()
            await User.deleteMany()

            console.log('Data Destroyed !')
            process.exit()
        } catch (error) {
            console.log(error)
            process.exit(1)
        }
    }

    if(process.argv[2] === '-d')
    destroyData()
    else {
    importData() }