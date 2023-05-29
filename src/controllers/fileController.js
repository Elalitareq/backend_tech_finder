import FileModel from "../models/file"

class FileController{
    post=(req,res,next)=>{
        const url = req.body.image
        FileModel.create({
            url
        }).then(response=>{
            if(response){res.send({success:true,message:"File was successfully saved",file:response})}
        }).catch(error=>{
            res.send({success:false,message:"File could not be saved " ,error:error})
        })

    }

}