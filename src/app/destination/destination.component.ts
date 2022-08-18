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
  touchStartY: number;
  touchEndX: number;
  touchEndY: number;
  static touchSensitivityX = 60;

  constructor(private destinationService: DestinationService) {     
    this.activeDestination = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
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

    if(destinationId < this.activeDestination){
      for(let i = destinationId; i<=this.activeDestination; i++){
        if(i!=destinationId){
          document.querySelector("#destination-image-"+i)?.classList.add('right');
          document.querySelector("#destination-item-"+i)?.classList.add('right');
          document.querySelector("#destination-stats-"+i)?.classList.add('right');
        }
        document.querySelector("#destination-image-"+i)?.classList.remove('left');
        document.querySelector("#destination-item-"+i)?.classList.remove('left');
        document.querySelector("#destination-stats-"+i)?.classList.remove('left');
      }
      
    }else{
      for(let i = this.activeDestination; i<=destinationId; i++){
        if(i!=destinationId){
          document.querySelector("#destination-image-"+i)?.classList.add('left');
          document.querySelector("#destination-item-"+i)?.classList.add('left');
          document.querySelector("#destination-stats-"+i)?.classList.add('left');
        }
        document.querySelector("#destination-image-"+i)?.classList.remove('right');
        document.querySelector("#destination-item-"+i)?.classList.remove('right');
        document.querySelector("#destination-stats-"+i)?.classList.remove('right');
      }
    }

  
    document.querySelector('#destination-button-'+destinationId)?.classList.add('active');
    document.querySelector('#destination-button-'+this.activeDestination)?.classList.remove('active');

    this.activeDestination = destinationId;
    
  }

  onSwipe(){
    const touchDeltaX = this.touchEndX-this.touchStartX; //positive: swiped right, negative: swiped left
    const touchDeltaY = this.touchEndY-this.touchStartY; //positive: swiped down, negative: swiped up

    // no action taken if a significant vertical swipe is detected
    if(Math.abs(touchDeltaX) < Math.abs(touchDeltaY)) return;

    if(touchDeltaX - DestinationComponent.touchSensitivityX > 0) //swiped right
      this.onDestinationClick(this.activeDestination-1);
    
    if(touchDeltaX + DestinationComponent.touchSensitivityX < 0) //swiped left
      this.onDestinationClick(this.activeDestination+1);
  }

  
  onTouchStart($event: TouchEvent){
    this.touchStartX = $event.changedTouches[0].screenX;
    this.touchStartY = $event.changedTouches[0].screenY;
  }
  onTouchEnd($event: TouchEvent){
    this.touchEndX = $event.changedTouches[0].screenX;
    this.touchEndY = $event.changedTouches[0].screenY;
    this.onSwipe();
  }
  onKeyDown($event: KeyboardEvent){
    if($event.key === 'ArrowLeft') this.onDestinationClick(this.activeDestination-1);
    if($event.key === 'ArrowRight') this.onDestinationClick(this.activeDestination+1);
  }

}
