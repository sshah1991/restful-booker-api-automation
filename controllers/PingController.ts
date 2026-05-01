//This is a "Child" class. It only contains logic related to the /ping endpoint.
//class will contain only the hit to methods

import { BaseController } from "./BaseController";

/* 'extends' means PingController inherits everything from BaseController */
export class PingController extends BaseController{

    /**
     * Action: Performs a GET request to verify the server is awake.
     * We don't put assertions here, only the action (the "How").
     */

    async getHealth(){
        // 'this.request' comes from the Parent (BaseController)
        return await this.request.get('/ping')
    }


}