import { getAllBookings } from "../models/BookingModel";
import { GetBookingController } from "../controllers/GetBookingController";
import test, { expect } from "playwright/test";

test('TC_007: List All Bookings Successfully @sanity',async({request})=>{
    const getBookingController= new GetBookingController(request)
    const response= await getBookingController.getAllBooking()
    expect(response.status()).toBe(200)
    
    const responseJSON= await response.json() as getAllBookings[]
    expect(responseJSON[0]).toBeDefined 
})