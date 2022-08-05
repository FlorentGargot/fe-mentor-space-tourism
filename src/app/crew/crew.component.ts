import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Crew } from '../models/crew.model';
import { CrewService } from '../services/crew.service';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit {
  crews: Crew[] = [];
  activeCrew: number;
  // Swipe event handling variables
  touchStartX: number;
  touchEndX: number;

  constructor(private crewService: CrewService) {
    this.activeCrew = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
    document.addEventListener('touchstart', e => { this.touchStartX = e.changedTouches[0].screenX});
    document.addEventListener('touchend', e => {
                          this.touchEndX = e.changedTouches[0].screenX;
                          this.onSwipe();})

    document.addEventListener('keydown', e => {
      if(e.key === 'ArrowRight' && this.activeCrew < this.crews.length-1) this.onCrewClick(this.activeCrew+1);
      if(e.key === 'ArrowLeft' && this.activeCrew > 0) this.onCrewClick(this.activeCrew-1)
    })
  }

  ngOnInit(): void {
    this.crewService.getAllCrew().subscribe(crews => this.crews = crews);
  }


  onCrewClick(crewId: number){
        // do nothing if clicked crew is already active
        if(crewId == this.activeCrew) return;

        // error handling
        if(crewId < 0) {console.error('onDestinationClick handler: crew ID is negative'); return};
        if(crewId >= this.crews.length) { console.error('onDestinationClick handler: crew ID is not in the crew list') ;return};
    
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
    if(this.touchEndX>this.touchStartX && this.activeCrew > 0) //swiped right
      this.onCrewClick(this.activeCrew-1);
    
    if(this.touchEndX<this.touchStartX && this.activeCrew < this.crews.length-1) //swiped left
      this.onCrewClick(this.activeCrew+1);
    
  }

}
