import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Destination } from "../models/destination.model";




@Injectable({
    providedIn: 'root'
})
export class DestinationService implements OnInit{


    constructor(private http: HttpClient){

    }

    ngOnInit(): void {
        
    }

    getAllDestinations() : Observable<Destination[]>{
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
        console.log(headers);
        return this.http.get<Destination[]>('/api/destinations', {'headers': headers });
    }
    
}