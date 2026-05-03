import { UpdateBookingController } from "../controllers/UpdateBookingController";
import { AuthController } from "../controllers/AuthController";
import { CreateBookingController } from "../controllers/CreateBookingController";
import { PutUpdate } from "../models/UpdateModel";
import { expect, Expect,request,test } from "playwright/test";
import { AuthRequest } from "../models/AuthModel";
import { AuthResponse } from "../models/AuthModel";
import { CreateBookingRequest } from "../models/BookingModel";
import { BookingTestData } from "../utils/BookingTestData";
import { CreateBookingResponse } from "../models/BookingModel";


test.only('TC_012: Full Update (PUT) Successfully @sanity',async({request})=>{
    const authBookingController= new AuthController(request)
    // Define our credentials using the Model
    const credentials: AuthRequest = {
        username: "admin",
        password: "password123"
    };
    const authBookingController_response= await authBookingController.createToken(credentials)
    expect(authBookingController_response.status()).toBe(200)
    const authBookingController_response_JSON: AuthResponse=await authBookingController_response.json()
    const token= authBookingController_response_JSON.token
    console.log(token)

    //Now create the booking
    const createBookingController= new CreateBookingController(request)
    const payload: CreateBookingRequest= BookingTestData.PUTValidBookingUpdatePayload()
    const createBookingResponse= await createBookingController.createBooking(payload)
    await expect(createBookingResponse.status()).toBe(200)
    const createBookingResponse_JSON:CreateBookingResponse = await createBookingResponse.json()
    const bookingID= createBookingResponse_JSON.bookingid
    console.log(bookingID)

    const updateBookingController= new UpdateBookingController(request)
    const updateBookingResponse= await updateBookingController.updateUsingPUT(bookingID,token,payload)
    expect(updateBookingResponse.status()).toBe(200)
    const updateBookingResponse_JSON:CreateBookingRequest=await updateBookingResponse.json()
    expect(updateBookingResponse_JSON.firstname).toBe("Abla")
    expect(updateBookingResponse_JSON.lastname).toBe("Tabla")
    console.log(updateBookingResponse_JSON.firstname,updateBookingResponse_JSON.lastname)

    
})