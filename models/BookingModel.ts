/**
 * Interface for the nested booking dates object
 */
export interface BookingDates {
    checkin: string
    checkout: string
}
/**
 * Interface for the Create Booking Request payload
 */
export interface CreateBookingRequest {
    firstname: string
    lastname: string
    totalprice: number
    depositpaid: boolean
    bookingdates: BookingDates
    additionalneeds: string
}
/**
 * Interface for the Create Booking Response
 * Note: The API returns the new ID plus the booking object you created
 */
export interface CreateBookingResponse{
    bookingid: number
    booking: CreateBookingRequest

}

export interface getAllBookings{
    bookingid:number
}