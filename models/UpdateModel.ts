import { BookingDates } from "./BookingModel"

export interface PutUpdate{
    firstname : string,
    lastname : string,
    totalprice : number,
    depositpaid : boolean,
    bookingdates : BookingDates
    additionalneeds: string
}