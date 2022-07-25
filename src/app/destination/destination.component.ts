import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Destination } from '../models/destination.model';
import { DestinationService } from '../services/destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  destinations: Destination[] = [];

  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.destinationService.getAllDestinations().subscribe(dest => this.destinations = dest);
  }

}
