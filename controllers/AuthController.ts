import { AuthRequest } from "../models/AuthModel";
import { BaseController } from "./BaseController";

export class AuthController extends BaseController{
    /**
     * Sends a POST request to generate an auth token.
     * @param authData - An object matching the AuthRequest interface
     */

    async createToken(credentials: AuthRequest) {
        return await this.request.post('/auth', {
            // Playwright automatically sets Content-Type to application/json 
            // when you use the 'data' property.
            data: credentials,
            headers: {
                'Accept': 'application/json'
            }
        });
    }

}