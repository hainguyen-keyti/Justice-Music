const config = require('../../../../config')
const User = require(config.models_dir + '/mongo/user')
const response_express = require(config.library_dir + '/response').response_express
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    if(!req.token_info || req.token_info === undefined)
        response_express.exception(res, new Error('Failed to authenticate token.'))
    

    console.log(req.body)
    const data = await lib_common.RemoveObjFieldNull(req.body, ["otherInfomaion"])
    if(Object.entries(data).length === 0)
        response_express.exception(res, "Can not input Object empty")


    User.findById(req.token_info._id)
    .then((user) => {

        response_express.exception(res, "loi roi")
        // Object.assign(user, req.body.mainInfo);
        // Object.assign(user.otherInfomaion, req.body.subInfo);
        // console.log(user)
        // return user.save();
    })
    .then(()=>{
        return response_express.success(res, "Update Success")
    })
    .catch(err=>response_express.exception(res, err.message))
}