import mongoose from 'mongoose'


const FileSchema =new  mongoose.Schema({
    url:{
        type:String,
        required:"File is required",
    }
})
const FileModel = mongoose.model("File", FileSchema)
export default FileModel