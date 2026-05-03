import { CreateBookingRequest } from "../models/BookingModel";
import { PutUpdate } from "../models/UpdateModel";

export class BookingTestData {

    static getValidBookingPayload(): CreateBookingRequest {
        return {
            firstname: "Sumeet",
            lastname: "Shah",
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: "2026-05-01",
                checkout: "2026-05-10"
            },
            additionalneeds: "Breakfast"
        };
    }

    static getInvalidBookingPayload(): CreateBookingRequest {
        return {
            firstname: `User_${Math.floor(Math.random() * 1000)}`,
            lastname: "Test",
            totalprice: Math.floor(Math.random() * 500),
            depositpaid: Math.random() < 0.5,
            bookingdates: {
                checkin: "2026-01-01",
                checkout: "2026-01-05"
            },
            additionalneeds: "None"
        };
    }

    static getMandatotyFeildMissingPayload() {
        return {
            lastname: "Shah",
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: "2026-05-01",
                checkout: "2026-05-10"
            },
            additionalneeds: "Breakfast"
        };
    }

    static PUTValidBookingUpdatePayload(): CreateBookingRequest {
        return {
            firstname: "Abla",
            lastname: "Tabla",
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: "2026-05-01",
                checkout: "2026-05-10"
            },
            additionalneeds: "Breakfast"
        };
    }

    static ValidPatchPayload(): Partial<PutUpdate> {
        return{
            firstname:"Babla",
            lastname:"Gabla"
        }
    }

}