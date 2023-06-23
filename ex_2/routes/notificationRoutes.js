const Notification = require('../models/notification')
const withAuth = require('../withAuth')

function notificationRoutes(app, io) {

    app.post('/notification/add', withAuth, async (req, res) => {

        let message;
        switch (req.body.action) {
            case "newMessage":
                message = "Nouveau Message"
                break;
            case "deleteMessage":
                message = "Message supprimé"
                break;
            case "updateMessage":
                message = "Message modifié"
            default:
                break;
        }

        const data = {
            senderUserId: req.body.senderUserId,
            receiverUserId: req.body.receiverUserId,
            action: req.body.action,
            creationDateTime: new Date(),
            view: false,
            message: message
        }

        const notification = new Notification(data);
        const result = await notification.save();
        console.log(result)
        if (result.code) {
            res.status(result.code).json({ result })
            return;
        }
        res.status(200).json({ result })

    })

    app.get('/notification/all', withAuth, async (req, res) => {
        const notifications = await Notification.find({});

        if (notifications.code) {
            res.status(notifications.code).json({ notifications })
        }

        res.status(200).json({ notifications })
    })



    app.get('/notificationByUser/:user_id', withAuth, async (req, res) => {
        const user_id = req.params.user_id;
        const notification = await Notification.find({ receiverUserId: user_id });
        if (notification.code) {
            res.status(notification.code).json({ notification })
        }
        res.status(200).json({ notification })
    })


    app.get('/notification/:id', async (req, res) => {
        const id = req.params.id;
        const notification = await Notification.findOne({ _id: id });

        if (notification.code) {
            res.status(notification.code).json({ notification })
        }
        res.status(200).json({ notification })
    })


}

module.exports = notificationRoutes