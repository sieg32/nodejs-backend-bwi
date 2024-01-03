const userModel = require("../schema/userSchema");

async function checkPermissions(req) {
  return req.params.id === req.tokenId || req.isAdmin;
}

async function updateUser(req, res) {
  if (await checkPermissions(req)) {
    try {
      let newData = {};

      if (req.body.name) {
        newData.name = req.body.name;
      }

      if (req.file) {
        newData.profileImg = {
          name: req.file.originalname,
          file: req.file.buffer,
        };
      }

      const data = await userModel.findByIdAndUpdate(
        req.params.id,
        newData,
        { new: true }
      );

      if (!data) {
        return res
          .status(404)
          .json({
            error: "User not found",
            message: "No user found with the provided ID",
          });
      }

      res.status(200).json({ message: "Update successful" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Internal server error",
          message: "Unable to process the request",
        });
    }
  } else {
    res
      .status(401)
      .json({
        error: "Permission denied",
        message: "Does not have permission to change userdata",
      });
  }
}

async function deleteUser(req, res) {
  if (await checkPermissions(req)) {
    try {
      const data = await userModel.findOneAndDelete({ _id: req.params.id });

      if (!data) {
        return res
          .status(404)
          .json({
            error: "User not found",
            message: "No user found with the provided ID",
          });
      }

      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Internal server error",
          message: "Unable to process the request",
        });
    }
  } else {
    res
      .status(401)
      .json({
        error: "Permission denied",
        message: "Does not have permission to delete user",
      });
  }
}

 async function getSingleUser(req,res){
    if(await checkPermissions(req)){
       try{
           const data = await userModel.findById(req.params.id).select('-password');
           if(data){
            res.status(200).json({data:data});
           }else{
            res.send('data not found')
           }
       } catch(error){
        console.log(error)
        res.status(500).send('internal server error')
       }


    }else{
        res.send('permission denied')
    }

 }
 async function getAllUsers(req,res){
  console.log(req.headers.token, req.isAdmin)
    if(req.isAdmin){
        try {
            const data = await userModel.find({}).select('-password');
            
            res.status(200).json({data:data});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }else{
        res.status(501).send('permission denied')
    }
 }


module.exports = { updateUser, deleteUser, checkPermissions ,getSingleUser, getAllUsers };
