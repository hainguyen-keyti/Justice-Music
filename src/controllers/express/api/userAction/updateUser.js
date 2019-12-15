const config = require('../../../../config')
const User = require(config.models_dir + '/mongo/user')
const response_express = require(config.library_dir + '/response').response_express
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    
    const data = await lib_common.RemoveObjFieldNull(req.body) // this function to remove all field that null, empyty or undefine 
    if(Object.entries(data).length === 0){
        return response_express.exception(res, "Please input field that you want update!")
    }

    User.findById(req.token_info._id)
    .then( (user) => {
        Object.assign(user, data);
        return user.save();
    })
    .then((user)=>{
        return response_express.success(res, user.userName)
    })
    .catch(err=>{
        console.log(err)
        return response_express.exception(res, err)
    })
}