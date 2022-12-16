/**
 * Fetch data from LCSD website and upload to Mongo. 
 * Use default export to fetch all (events and venues). 
 * Returns Update Timestamp.
 */

const EVENTS_URL = "https%3A%2F%2Fwww.lcsd.gov.hk%2Fdatagovhk%2Fevent%2Fevents.xml";
const DATE_URL = "https%3A%2F%2Fwww.lcsd.gov.hk%2Fdatagovhk%2Fevent%2FeventDates.xml";
const VENUE_URL = "https%3A%2F%2Fwww.lcsd.gov.hk%2Fdatagovhk%2Fevent%2Fvenues.xml"

async function fetchVenues(start, end) {
    /* Returns a dictionary containing all venues, e.g.
        { 
            58: {venuee: 'City Hall Public Library', latitude: '', longitude: ''}
            3110031 : {venuee: 'North District Town Hall (Auditorium)', latitude: '22.501639', longitude: '114.128911'}
        }
    */
    const timestamp = await fetch(`https://api.data.gov.hk/v1/historical-archive/list-file-versions?url=${VENUE_URL}&start=${start}&end=${end}`)
        .then((res) => res.json())
        .then((data) => data.timestamps[data.timestamps.length - 1]);

    const res = await fetch(`https://api.data.gov.hk/v1/historical-archive/get-file?url=${VENUE_URL}&time=${timestamp}`)
        .then((res) => res.text())
        .then((data) => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(data, "text/xml");
            let venues = xml.getElementsByTagName("venue")
            let dict = {};

            for (let e of venues) {
                let vid = parseInt(e.getAttribute("id"));
                dict[vid] = {
                    venuee: e.getElementsByTagName("venuee")[0].textContent,
                    latitude: e.getElementsByTagName("latitude")[0].textContent,
                    longitude: e.getElementsByTagName("longitude")[0].textContent,
                }
            }
            // console.log(dict[58])
            return dict
        })
    return {
        data: res,
        timestamp: timestamp
    }
}

async function fetchEvents(start, end) {
    /* Returns a list containing all events, e.g.
        [
            {eventid: 144378, titlee: '"A Woman Is A Woman"- Fest of Belles and Queens: Actresses European and Hollywood', venueid: 75010017, desce: 'Five years after…And God Created Woman came A Woma…hive\nPost-screening Talk in Cantonese by Sonia Au', presenterorge: 'Presented by Leisure and Cultural Services Department', …}
        ]
    */
    const timestamp = await fetch(`https://api.data.gov.hk/v1/historical-archive/list-file-versions?url=${EVENTS_URL}&start=${start}&end=${end}`)
        .then((res) => res.json())
        .then((data) => data.timestamps[data.timestamps.length - 1]);

    const res = await fetch(`https://api.data.gov.hk/v1/historical-archive/get-file?url=${EVENTS_URL}&time=${timestamp}`)
        .then((res) => res.text())
        .then((data) => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(data, "text/xml");
            let events = xml.getElementsByTagName("event")
            let list = [];

            for (let e of events) {
                let eid = parseInt(e.getAttribute("id"))

                list.push({
                    eventid: parseInt(e.getAttribute("id")),
                    titlee: e.getElementsByTagName("titlee")[0].textContent,
                    venueid: parseInt(e.getElementsByTagName("venueid")[0].textContent),
                    desce: e.getElementsByTagName("desce")[0].textContent,
                    presenterorge: e.getElementsByTagName("presenterorge")[0].textContent,
                    pricee: e.getElementsByTagName("pricee")[0].textContent,
                })
            }
            // console.log(list[0])
            return list
        })
    return {
        data: res,
        timestamp: timestamp
    }
}

async function updateVenues(venues) {
    venues.forEach((item) => {
        fetch('http://localhost:3001/updateVenue', {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(item)
        })
            .then((res) => res.json())
            .then((obj) => {
                if (obj.err)
                    console.log(obj.err);
            })
    })
}

/**
 * TO-DO: currently create MANY API calls (# of events).
 * See if possible to batch upload in one call?
 */
async function updateEvents(events) {
    events.forEach((item) => {
        fetch('http://localhost:3001/updateEvent', {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(item)
        })
            .then((res) => res.json(item))
            .then((obj) => {
                if (obj.err)
                    console.log(obj.err);
            })
    })
}

function formatDate(d) {
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('');
}

function processVenues(venues, events) {
    let event_lists = {};
    for (let e of events) {
        if (!event_lists[e.venueid])
            event_lists[e.venueid] = []

        event_lists[e.venueid].push(e.eventid)
    }

    let venues_id_sorted = Object.keys(event_lists).sort(function (a, b) {
        return event_lists[b].length - event_lists[a].length
    })

    let top_venues = [];
    for (let venueid of venues_id_sorted) {
        let venue = venues[venueid]
        venue['venueid'] = venueid
        venue['events'] = event_lists[venueid]

        top_venues.push(venue)
        if (Object.keys(top_venues).length >= 10)
            break;
    }

    return top_venues
}

export default async function fetchAllData() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let end = formatDate(date); // yesterday i.e. latest
    date.setDate(date.getDate() - 1);
    let start = formatDate(date); // day before yesterday

    const events = await fetchEvents(start, end);
    const venues = await fetchVenues(start, end);

    const top_venue_with_events = processVenues(venues.data, events.data);
    
    updateEvents(events.data);
    updateVenues(top_venue_with_events);

    console.log("Finished fetch and update LCSD events and venues.")
    return events.timestamp;
}