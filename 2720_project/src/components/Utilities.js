export async function getAllVenues() {
    return await fetch('http://18.210.46.64:3001/getAllVenues', {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        }
    })
        .then((res) => res.json())
}

export async function getEvent(id) {
    return await fetch('http://18.210.46.64:3001/getEvent', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ eventid: id })
    })
        .then((res) => res.json())
}

export async function getCommentList(id) {
    return await fetch('http://18.210.46.64:3001/getComments', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ venueid: id })
    })
        .then((res) => res.json())
}

export async function updateComment(id, comment) {
    console.log(id, comment)
    return await fetch('http://localhost:3001/updateComment', {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            venueid: id,
            comments: [{
                username: comment.username,
                body: comment.body,
                date: comment.date,
            }],
        })
    })
        .then((res) => res.json())
}
