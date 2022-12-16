const EVENTS_URL = "https%3A%2F%2Fwww.lcsd.gov.hk%2Fdatagovhk%2Fevent%2Fevents.xml";
const DATE_URL = "https%3A%2F%2Fwww.lcsd.gov.hk%2Fdatagovhk%2Fevent%2FeventDates.xml";
const VENUE_URL = "https%3A%2F%2Fwww.lcsd.gov.hk%2Fdatagovhk%2Fevent%2Fvenues.xml"

async function fetchVenues(start, end) {
    /* Returns a dictionary containing all venues, e.g.
        { 
            8263 : {venuec: '英皇戲院尖沙咀iSQUARE', venuee: 'Emperor Cinemas iSQUARE', latitude: '', longitude: ''}, ### might have no latlon ###
            3110031 : {venuec: '北區大會堂 (演奏廳)', venuee: 'North District Town Hall (Auditorium)', latitude: '22.501639', longitude: '114.128911'}
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
    return res
}

async function fetchEvents(start, end) {
    /* Returns a list containing all events, e.g.
        [
            {id: 144378, titlec: '《女人就是女人》─ 歐洲女神、美國烈女', titlee: '"A Woman Is A Woman"- Fest of Belles and Queens: Actresses European and Hollywood', venueid: 75010017, descc: '高達第一部彩色闊銀幕電影，開場就大字報地「廣播」導演的創作意圖：色彩、聲音、音樂、法國喜劇、歌劇與情…\n11/12 (日) 11:30am 香港電影資料館電影院\n設映後談 | 講者歐嘉麗 | 粵語主講', …},
            {id: 144417, titlec: '《列車女賊》─ 歐洲女神、美國烈女', titlee: '"Boxcar Bertha"- Fest of Belles and Queens: Actresses European and Hollywood', venueid: 8263, descc: '馬田史高西斯成名之前也拍過B級片！拍竣第一部獨立長片但仍未製作一鳴驚人的《窮街陋巷》 （Mean S…。要回溯馬田史高西斯邁向大師的歷程，這是不能或缺的文本。\n\n設映後談 | 講者歐嘉麗 | 粵語主講', …},
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
    return res
}

async function uploadVenues(venues) {
    // venues.forEach((venue) => {
    //     fetch(`${process.env.REACT_APP_SERVER_URL}/upload/venues`, {
    //         method: "POST",
    //         headers: new Headers({
    //             "Content-Type": 'application/json',
    //         }),
    //         body: JSON.stringify({
    //             venueid: loc.locationId,
    //             eventList: loc.eventList
    //         })
    //     })
    //         .then((res) => res.json())
    //         .then((obj) => {
    //             if (obj.err)
    //                 console.log(obj.err);
    //             else
    //                 console.log(obj.msg);
    //         })
    // })
    // veneuid: { type: Number, required: true, unique: true },
    // venuee: String,
    // longitude: Number,
    // latitude: Number,
    // events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    // comments: [{ 
    //     username: { type: Schema.Types.ObjectId, ref: 'User' }, 
    //     body: String,
    //     date: Date,
    // }]
}

async function uploadEvents(events) {
    events.forEach((event) => {
        fetch('http://localhost:3001/updateEvent', {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(event)
        })
            .then((res) => res.json())
            .then((obj) => {
                if (obj.err)
                    console.log(obj.err);
            })
    })
    console.log("Update Finished")
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

export default async function fetchAllData() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let end = formatDate(date); // yesterday i.e. latest
    date.setDate(date.getDate() - 1);
    let start = formatDate(date); // day before yesterday

    const events = await fetchEvents(start, end);
    const venues = await fetchVenues(start, end);

    uploadEvents(events);
    // uploadVenues(venues);

    return venues;
}