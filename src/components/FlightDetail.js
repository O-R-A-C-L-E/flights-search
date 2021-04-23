import React from 'react';

const FlightDetail = ({departure, arrival, flightDuration, segmentsCount, airline}) => {
    if (arrival === undefined){
        arrival = departure;
    }
    let days = ["сб","пн", "вт", "ср", "чт", "пт", "вс"];
    let months = ["янв.", "фев.", "мар.", "апр.", "май.", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек."];

    let departureDateString = new Date(departure?.departureDate);
    let departureTime = (("0" + departureDateString.getHours()).slice(-2) + ":" + ("0" + departureDateString.getMinutes()).slice(-2));
    let departureDayOfWeek = days[departureDateString.getDay()];
    let departureMonth = months[departureDateString.getMonth()];
    let departureDay = ('0' + departureDateString.getDate()).slice(-2);

    let arrivalDateString = new Date(arrival?.arrivalDate);
    let arrivalTime = (("0" + arrivalDateString.getHours()).slice(-2) + ":" + ("0" + arrivalDateString.getMinutes()).slice(-2));
    let arrivalDayOfWeek = days[arrivalDateString.getDay()];
    let arrivalDay = ("0" + arrivalDateString.getDate()).slice(-2);
    let arrivalMonth = months[arrivalDateString.getMonth()];
    let [hour, min] = (flightDuration/ 60).toString().split(".");
    let minInt = !min ? "" : Math.round(parseInt(min) % 60);

    let transfersWord = segmentsCount > 1 ? " пересадки" : " пересадка";
    let transfers = segmentsCount === 0 ? "" : segmentsCount + transfersWord;

    return(
        <div className="segment">
            <div className="from--to">
                <div>
                    <span>{departure?.departureCity?.caption},</span>
                    <span>{departure?.departureAirport?.caption}</span>
                    <span style={{color: "#487dd9"}}>({departure?.departureAirport?.uid})</span>
                    <span style={{color: "#487dd9"}}>--></span>
                </div>
                <div>
                    <span>{arrival?.arrivalCity?.caption},</span>
                    <span>{arrival?.arrivalAirport?.caption}</span>
                    <span style={{color: "#487dd9"}}>({arrival?.arrivalAirport?.uid})</span>
                </div>
            </div>
            <div className="flight-data">
                <div>
                            <span className="time">
                                {departureTime}
                            </span>
                    <span style={{color: "#487dd9", marginLeft: 10 }}>{`${departureDay} ${departureMonth} ${departureDayOfWeek} `}</span>
                </div>
                <div>
                    <span className="time">{`${hour} ч ${minInt} ${minInt === "" ? "" : "м"}`}</span>
                    <span className="switch">{transfers}</span>
                </div>
                <div>
                    <span style={{color: "#487dd9" , marginRight: 10 }}>{`${arrivalDay} ${arrivalMonth} ${arrivalDayOfWeek} `}</span>
                    <span className="time">{arrivalTime}</span>
                </div>
            </div>
            <div className="airline">
                Рейс выполняет: {airline.caption}
            </div>
        </div>
    )

};

export default FlightDetail;