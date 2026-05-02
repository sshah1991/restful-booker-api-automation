import { BaseController } from "./BaseController";
//import { getAllBookings } from "../models/BookingModel";

export class GetBookingController extends BaseController{
    async getAllBooking(){
     return this.request.get('/booking')
    }
    async getSingleBooking(id: number){
        return this.request.get(`/booking/${id}`)
    }
}