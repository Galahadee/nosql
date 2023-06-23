const Mongoose = require('mongoose');

const notificationsSchema = new Mongoose.Schema({
    senderUserId: {type: String, required: true},
    receiverUserId:  {type: String, required: true},
    action:{type:String,required:true},
    creationDateTime: {type: Date, required: true},
    view: {type: Boolean, required: true},
    message: {type:String, required:true}
}, {collection: "notification"})

const NotificationModel = Mongoose.model("Notification", notificationsSchema);

module.exports = NotificationModel;