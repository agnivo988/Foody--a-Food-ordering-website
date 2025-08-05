import mongoose from 'mongoose'


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://agnivo22012006:Agnivo713151@cluster0.humvu6a.mongodb.net/Foody').then(()=>console.log("DB Connected"));
}