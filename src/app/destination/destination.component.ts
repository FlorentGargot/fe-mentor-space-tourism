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
  activeDestination: number;

  constructor(private destinationService: DestinationService) {     
    this.activeDestination = 0;
  }

  ngOnInit(): void {
    this.destinationService.getAllDestinations().subscribe(dest => this.destinations = dest);
  }


  onDestinationClick(destinationId: number){

    // do nothing if clicked destination is already active
    if(destinationId == this.activeDestination) return;

    // error handling
    if(destinationId < 0) {console.error('onDestinationClick handler: destination ID is negative'); return};
    if(destinationId >= this.destinations.length) { console.error('onDestinationClick handler: destination ID is not in the destination list') ;return};

    document.querySelectorAll('.active-destination').forEach(element => element.classList.remove("active-destination"));
    document.querySelectorAll('.destination-select-item').forEach(element => element.classList.remove("active"));

    document.querySelector('#destination-image-'+destinationId)?.classList.add('active-destination');
    document.querySelector('#destination-item-'+destinationId)?.classList.add('active-destination');
    document.querySelector('#destination-stats-'+destinationId)?.classList.add('active-destination');
    document.querySelector('#destination-button-'+destinationId)?.classList.add('active');

    this.activeDestination = destinationId;
    
  }

}
