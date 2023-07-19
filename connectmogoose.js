import mongoose from "mongoose";

const connectMogoose = async () => {
    try {
        const conect = await mongoose.connect(process.env.MONGOOSE_URI)
        if (conect.connection.readyState === 1) console.log('Mongoose connection successful')
        else console.log('DB Connecting')
    } catch (error) {
        console.log(error)
    }
}
export default connectMogoose