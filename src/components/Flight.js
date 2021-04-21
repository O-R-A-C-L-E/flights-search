import React from 'react';
import '../flight.css'

const Flight = (props) => {
    const flightData = props.data.flight.legs[0].segments.map(segment => {
        let days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
        let months = ["янв.", "фев.", "мар.", "апр.", "май.", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек."];

        let departureDateString = new Date(segment.departureDate);
        let departureTime = (("0" + departureDateString.getHours()).slice(-2) + ":" + ("0" + departureDateString.getMinutes()).slice(-2))
        let departureDayOfWeek = days[departureDateString.getDay()];
        let departureMonth = months[departureDateString.getMonth()];
        let departureDay = ('0' + departureDateString.getDate()).slice(-2)
        console.log(departureDay);

        let arrivalDateString = new Date(segment.arrivalDate);
        let arrivalTime = (("0" + arrivalDateString.getHours()).slice(-2) + ":" + ("0" + arrivalDateString.getMinutes()).slice(-2))
        let arrivalDate = ("0" + arrivalDateString.getDate()).slice(-2);
        let arrivalDayOfWeek = days[arrivalDateString.getDay()];
        let arrivalMonth = months[arrivalDateString.getMonth()];
            return(
                <div key={segment.flightNumber} className="segment">
                    <div className="from--to">
                        <div>
                            <span>{segment.departureCity.caption},</span>
                            <span>{segment.departureAirport.caption}</span>
                            <span style={{color: "#487dd9"}}>({segment.departureAirport.uid})</span>
                            <span style={{color: "#487dd9"}}>--></span>
                        </div>
                        <div>
                            <span>{segment?.arrivalCity?.caption},</span>
                            <span>{segment?.arrivalAirport?.caption}</span>
                            <span style={{color: "#487dd9"}}>({segment.arrivalAirport.uid})</span>
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
                            <span className="time">{Math.round(segment.travelDuration / 60 )} min</span>
                            <span className="switch">1 пересадка</span>
                        </div>
                        <div>
                            <span style={{color: "#487dd9" , marginRight: 10 }}>{`${arrivalDate} ${arrivalMonth} ${arrivalDayOfWeek} `}</span>
                            <span className="time">{arrivalTime}</span>
                        </div>
                    </div>
                    <div className="airline">
                        Рейс выполняет: {segment.airline.caption}
                    </div>
                </div>
            )
        })

    return (
        <div className="flight">
            <div className='header'>
                <div>{props.data.flight.carrier.caption}</div>
                <div>
                    <span>{Math.round(props.data.flight.price.passengerPrices[0].singlePassengerTotal.amount) + " ₽"}</span>
                    <span style={{fontSize: 12}}>Стоимость для одного взрослого пассажира</span>
                </div>
            </div>
            {flightData}


            <button>Выбрать</button>
        </div>
    )

};

export default Flight;

