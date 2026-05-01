import { BaseController } from "./BaseController";
import { CreateBookingRequest } from "../models/BookingModel";

export class CreateBookingController extends BaseController {
    async createBooking(payload: CreateBookingRequest) {
        return await this.request.post('/booking',
            {
                data:payload,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
    }

}