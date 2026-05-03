import { BaseController } from "./BaseController";
import { PutUpdate } from "../models/UpdateModel";

export class UpdateBookingController extends BaseController {
    async updateUsingPUT(bookingID: number, token: string, payload: PutUpdate) {
        return await this.request.put(`/booking/${bookingID}`,
            {
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': `token=${token}`
                }
            })
    }
    async updateUsingPATCH(bookingID: number, token: string, payload: Partial<PutUpdate>) {
        return await this.request.patch(`/booking/${bookingID}`,
            {
                data: payload,
                headers:
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': `token=${token}`
                }

            })
    }
}