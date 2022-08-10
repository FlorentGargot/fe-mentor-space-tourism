import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Crew } from '../models/crew.model';
import { CrewService } from '../services/crew.service';


@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
  host: { ['(document:touchstart)']: 'onTouchStart($event)',
          ['(document:touchend)']: 'onTouchEnd($event)',
          ['(document:keydown)']: 'onKeyDown($event)'}
})
export class CrewComponent implements OnInit {
  crews: Crew[] = [];
  activeCrew: number;
  // Swipe event handling variables
  touchStartX: number;
  touchStartY: number;
  touchEndX: number;
  touchEndY: number;
  static touchSensitivityX = 60;

  constructor(private crewService: CrewService) {
    this.activeCrew = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
  }

  ngOnInit(): void {
    this.crewService.getAllCrew().subscribe(crews => this.crews = crews);
  }


  onCrewClick(crewId: number){
        // do nothing if clicked crew is already active
        if(crewId == this.activeCrew) return;

        if(crewId < 0) crewId = this.crews.length-1;
        if(crewId >= this.crews.length) crewId = 0;
    
        if(crewId < this.activeCrew)  //clicked item left to active item
        {
          for(let i = crewId; i<=this.activeCrew; i++){
            if(i!=crewId){
              document.querySelector("#crew-image-"+i)?.classList.add('right');
              document.querySelector("#crew-content-item-"+i)?.classList.add('right');
            }
            document.querySelector("#crew-image-"+i)?.classList.remove('left');
            document.querySelector("#crew-content-item-"+i)?.classList.remove('left');
          }
        }
        else  //clicked item right to active item (click event to already active item handled before)
        {  
          for(let i = this.activeCrew; i<=crewId;i++){
            if(i!=crewId){
              document.querySelector("#crew-image-"+i)?.classList.add('left');
              document.querySelector("#crew-content-item-"+i)?.classList.add('left');
            }
            
            document.querySelector("#crew-image-"+i)?.classList.remove('right');
            document.querySelector("#crew-content-item-"+i)?.classList.remove('right');

          }
        }    

        //add the 'active' class to the newly active selector
        document.querySelector('#crew-item-'+crewId)?.classList.add('active');
        document.querySelector('#crew-item-'+this.activeCrew)?.classList.remove('active');
    
        this.activeCrew = crewId;
  }

  onSwipe(){
    const touchDeltaY = this.touchEndY-this.touchStartY; //positive: swiped down, negative: swiped up
    const touchDeltaX = this.touchEndX-this.touchStartX; //positive: swiped right, negative: swiped left
    
    // no action taken if a significant vertical swipe is detected
    if(Math.abs(touchDeltaX) < Math.abs(touchDeltaY)) return;

    if(touchDeltaX - CrewComponent.touchSensitivityX > 0) //swiped right
      this.onCrewClick(this.activeCrew-1);
    
    if(touchDeltaX + CrewComponent.touchSensitivityX < 0) //swiped left
      this.onCrewClick(this.activeCrew+1);
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
    if($event.key === 'ArrowLeft') this.onCrewClick(this.activeCrew-1);
    if($event.key === 'ArrowRight') this.onCrewClick(this.activeCrew+1);
  }

}
