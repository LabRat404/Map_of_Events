export async function getAllVenues() {
    return await fetch('http://18.210.46.64:3001/getAllVenues', {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ eventid: 141097 })
    })
        .then((res) => res.json())
        .then((obj) => {
            console.log(obj);
        })
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
        .then((obj) => {
            console.log(obj);
        })
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
        .then((obj) => {
            console.log(obj);
        })
}

export async function updateComment(id, comment) {
    return await fetch('http://18.210.46.64:3001/updateComment', {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            venueid: id,
            comments: [comment],
        })
    })
        .then((res) => res.json())
        .then((obj) => {
            if (obj.err)
                console.log(obj.err);
        })
}
