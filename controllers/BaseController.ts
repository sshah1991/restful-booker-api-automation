//This is the "Parent" class. It acts as a foundation for all other API resources

import { APIRequestContext } from "playwright";

export class BaseController{
    /* 'protected' means this variable is private to the outside world 
       but can be used by any class that 'extends' this one */
    protected request: APIRequestContext

    /* The constructor runs as soon as you create a 'new' instance of a controller */
    constructor(request: APIRequestContext){
        this.request=request// Saves the Playwright 'request' tool for use in methods
    }
}