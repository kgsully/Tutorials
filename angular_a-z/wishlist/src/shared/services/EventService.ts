import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

// This is defining an Event Bus to allow events to be subscribed to and used everywhere within the application without having to pass emitted events up to parent
// objects and then subsquently passed down to different child objects. This can get tedious and unmaintainable as the application grows

// Need to add the @Injectable() decorator in order for Angular to know that it can be injected as a dependency in other classes.
// You can pass an object with the key providedIn to define where it can/should be injected into (as an option).
// You can also specify providedIn: 'root' to make it an application-level injector such that it be available throughout the ENTIRE application.
// Can also specify providedIn: 'platform' to make it available to multiple angular applications
// Can ALSO specify individually in the 'providers: []' in the components
@Injectable(
    { providedIn: 'root' }
)
export class EventService { // Original implementation didn't export the entire class, it default exported an instance (thereby creating a singleton)
    private subject = new Subject();

    emit(eventName: string, payload: any) {
        // The .next method is what emits the event with the payload provided as an argument, this payload is the object that we want the subscribers to work with
        // Whenever an event is emitted, the .next method will execute, passing in the object that has the eventName and payload, which will then be passed to the
        //  callback function for the subscribe method (below in listen())
        this.subject.next({eventName, payload})
    }

    listen(eventName: string, callback: (event: any) => void) {
        // The asObservable method gives access to the subscribe method.
        // The subscribe method, by default, accepts a callback function that accepts whatever is passed to the .next method (in emit() above)
        this.subject.asObservable().subscribe((nextObj: any) => {   // called nextObj as this is the object coming from this.subject.next
            // In the callback function, check if the eventName being listened for (property of listen()) === the eventName being passed by the emitted event.
            // If they are equal, call the provided callback function (callback defined in the function signature for listen())
            if (eventName === nextObj.eventName) {
                callback(nextObj.payload);
            }
        })
    }
}

// Exporting an instance of EventService. This is used when NOT using dependency injection
// Note that per TS convention, this a singleton. This is because the module exports the RESULT of the evaluation, which is only evaluated ONCE.
// ALTERNATIVELY- see https://stackoverflow.com/a/54351936 for another singleton convention
// export default new EventService();

// Notes on how this works:

// 1. The object that is going to emit the event calls the emit() function, which in turn calls the subject's .next() method, passing in the 'event object' (so to speak)
//      that has the eventName and the payload
// 2. The object that is going to listen for that event is going to use the subject's asObservable method, because it gives access to the subscribe() method
//      so an object that is going to subscribe will receive this event object with the eventName and payload.
//      Then check if the eventName in the event object is the same as the eventName provided to the listen() method, and if it is, execute the provided (provided to listen())
//      callback function, passing in the event payload to the callback
