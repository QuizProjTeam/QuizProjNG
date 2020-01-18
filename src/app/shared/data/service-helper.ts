import { Response  } from '@angular/http';
import { Observable, throwError } from 'rxjs';
 /*
*
* Helper for list options selections
*/
export class ServiceHelper {

    // process inbound json to our entity
    static ExtractData(res: Response): any {
        let body: any;
        if (res) {
            if (res.status === 200) {
                 body = res.json(); // is an array of items
            }
        }
        return body || { }; //
    }
    // helper used int rest update calls, to extract status code from response, no body is expected
  static GetStatusCode(res: Response): number {
         return res.status;
    }

    static SnoopData(res: Response) {
        const body = res.json();
       // console.log("snoop",body);
    }
    // handle errors in service call
    static HandleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead

        return throwError(error);

    }


}


