import { Component, OnInit } from '@angular/core';
import { Technology } from '../models/technology.model';
import { TechnologyService } from '../services/technology.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss'],
  host: { ['(document:touchstart)']: 'onTouchStart($event)',
          ['(document:touchend)']: 'onTouchEnd($event)',
          ['(document:keydown)']: 'onKeyDown($event)'}
})
export class TechnologyComponent implements OnInit {
  technologies: Technology[] = [];
  activeTechnology: number;
  // Swipe event handling variables
  touchStartX: number;
  touchStartY: number;
  touchEndX: number;
  touchEndY: number;
  static touchSensitivityX = 60;

  constructor(private technologyService: TechnologyService) { 
    this.activeTechnology = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
  }

  ngOnInit(): void {
    this.technologyService.getAllTechnologies().subscribe(tech => this.technologies = tech);
  }

  onTechnologyClick(techID: number){

    if(techID == this.activeTechnology) return;

    if(techID < 0) techID = this.technologies.length - 1;
    if(techID >= this.technologies.length) techID = 0;

    if(techID < this.activeTechnology){
      for(let i = techID; i<= this.activeTechnology; i++){
        if(i!=techID){
          document.querySelector("#technology-image-"+i)?.classList.add('right');
          document.querySelector("#technology-content-item-"+i)?.classList.add('right');
        }
        document.querySelector("#technology-image-"+i)?.classList.remove('left');
        document.querySelector("#technology-content-item-"+i)?.classList.remove('left');
      }
    }
    else{
      for(let i = this.activeTechnology; i<= techID; i++){
        if(i!=techID){
          document.querySelector("#technology-image-"+i)?.classList.add('left');
          document.querySelector("#technology-content-item-"+i)?.classList.add('left');
        }
        document.querySelector("#technology-image-"+i)?.classList.remove('right');
        document.querySelector("#technology-content-item-"+i)?.classList.remove('right');
      }
    }

    document.querySelector('#technology-select-item-'+techID)?.classList.add('active');
    document.querySelector('#technology-select-item-'+this.activeTechnology)?.classList.remove('active');

    this.activeTechnology = techID;

  }

  onSwipe(){
    const touchDeltaY = this.touchEndY-this.touchStartY; //positive: swiped down, negative: swiped up
    const touchDeltaX = this.touchEndX-this.touchStartX; //positive: swiped right, negative: swiped left
        
    // no action taken if a significant vertical swipe is detected
    if(Math.abs(touchDeltaX) < Math.abs(touchDeltaY)) return;

    if(touchDeltaX - TechnologyComponent.touchSensitivityX > 0) //swiped right
    this.onTechnologyClick(this.activeTechnology-1);
  
    if(touchDeltaX + TechnologyComponent.touchSensitivityX < 0) //swiped left
      this.onTechnologyClick(this.activeTechnology+1);
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
    if($event.key === 'ArrowLeft') this.onTechnologyClick(this.activeTechnology-1);
    if($event.key === 'ArrowRight') this.onTechnologyClick(this.activeTechnology+1);
  }


}
