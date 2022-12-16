/**
 * api call for one event

    fetch('http://localhost:3001/getEvent', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({eventid: 141097})
    })
        .then((res) => res.json())
        .then((obj) => {
            console.log(obj);
        })
 */



    // fetch('http://localhost:3001/getVenue', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": 'application/json',
    //     },
    //     body: JSON.stringify({ venueid: 36310566 })
    // })
    //     .then((res) => res.json())
    //     .then((obj) => {
    //         console.log(obj);
    //     }

    // console.log(top_venue_with_events[1])

    // fetch('http://localhost:3001/updateVenue', {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": 'application/json',
    //         },
    //         body: JSON.stringify(top_venue_with_events[3])
    //     })
    //         .then((res) => res.json())
    //         .then((obj) => {
    //             if (obj.err)
    //                 console.log(obj.err);
    //         })

    // updateEvents(events.data);