import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Technology } from "../models/technology.model";

@Injectable({
    providedIn: 'root'
})

export class TechnologyService implements OnInit{
    
    constructor(private http: HttpClient){

    }

    ngOnInit(): void {
        
    }

    getAllTechnologies(): Observable<Technology[]>{
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');

        return this.http.get<Technology[]>('/api/technology', {'headers' : headers});
    }

}