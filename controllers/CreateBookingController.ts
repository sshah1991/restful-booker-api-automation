import { BaseController } from "./BaseController";
import { CreateBookingRequest } from "../models/CreateBookingModel";
import { CreateBookingResponse } from "../models/CreateBookingModel";

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