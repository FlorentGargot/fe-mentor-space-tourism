import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Crew } from "../models/crew.model";

@Injectable({
    providedIn: 'root'
})
export class CrewService implements OnInit {

    constructor(private http: HttpClient){

    }

    ngOnInit(): void {
        
    }
    
    getAllCrew() : Observable<Crew[]>{
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
        return this.http.get<Crew[]>('/api/destinations', {'headers': headers });
    }
    
}