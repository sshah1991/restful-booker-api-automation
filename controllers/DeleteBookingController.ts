import { BaseController } from "./BaseController";

export class DeleteBookingController extends BaseController{
    async DeleteBooking(bookingID: number, token: string){
        return this.request.delete(`/booking/${bookingID}`,
            {   
                headers:
                {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${token}`
                }
            })
    }
}