import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Destination } from '../models/destination.model';
import { DestinationService } from '../services/destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
  host: { ['(document:touchstart)']: 'onTouchStart($event)',
          ['(document:touchend)']: 'onTouchEnd($event)',
          ['(document:keydown)']: 'onKeyDown($event)'}
})
export class DestinationComponent implements OnInit {

  destinations: Destination[] = [];
  activeDestination: number;
  // Swipe event handling variables
  touchStartX: number;
  touchEndX: number;
  static touchSensitivityX = 40;

  constructor(private destinationService: DestinationService) {     
    this.activeDestination = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  ngOnInit(): void {
    this.destinationService.getAllDestinations().subscribe(dest => this.destinations = dest);
  }


  onDestinationClick(destinationId: number){

    // do nothing if clicked destination is already active
    if(destinationId == this.activeDestination) return;

    // error handling
    if(destinationId < 0) destinationId = this.destinations.length-1;
    if(destinationId >= this.destinations.length) destinationId = 0;

    document.querySelectorAll('.active-destination').forEach(element => element.classList.remove("active-destination"));
    document.querySelectorAll('.destination-select-item').forEach(element => element.classList.remove("active"));

    document.querySelector('#destination-image-'+destinationId)?.classList.add('active-destination');
    document.querySelector('#destination-item-'+destinationId)?.classList.add('active-destination');
    document.querySelector('#destination-stats-'+destinationId)?.classList.add('active-destination');
    document.querySelector('#destination-button-'+destinationId)?.classList.add('active');

    this.activeDestination = destinationId;
    
  }

  onSwipe(){
    if(this.touchEndX>this.touchStartX) //swiped right
      this.onDestinationClick(this.activeDestination-1);
    
    if(this.touchEndX<this.touchStartX) //swiped left
      this.onDestinationClick(this.activeDestination+1);
    

  }

  
  onTouchStart($event: TouchEvent){
    this.touchStartX = $event.changedTouches[0].screenX;
  }
  onTouchEnd($event: TouchEvent){
    this.touchEndX = $event.changedTouches[0].screenX;
    this.onSwipe();
  }
  onKeyDown($event: KeyboardEvent){
    if($event.key === 'ArrowLeft') this.onDestinationClick(this.activeDestination-1);
    if($event.key === 'ArrowRight') this.onDestinationClick(this.activeDestination+1);
  }

}
