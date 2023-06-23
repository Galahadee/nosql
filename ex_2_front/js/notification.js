export function sendMessage(user, body, token) {
    const userId1 = "6492f294708177231b477255";
    const userId2 = "64941a63adfd2bf9c4c14ae3"
    console.log(user)
    const data = {
        senderUserId: user._id,
        receiverUserId: user._id === userId1 ? userId2 : userId1,
        body: body
    }

    console.log('data', data)

    return fetch('http://localhost:19000/notification', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token
        },
        body: JSON.stringify(data)
    })
    .then((response)=>{
        return response.json();      
    })
}

export function newNotification(user, body, token) {
    const userId1 = "6492f294708177231b477255";
    const userId2 = "64941a63adfd2bf9c4c14ae3";
    console.log(user)

    switch (key) {
        case value:

            break;

        default:
            break;
    }

    const action="test";
    const data = {
        senderUserId: user._id,
        receiverUserId: user._id === userId1 ? userId2 : userId1,
        creation: new Date.now(),
        action: action,
        view:false,
        message: "test"
    }

    console.log('data', data)
}