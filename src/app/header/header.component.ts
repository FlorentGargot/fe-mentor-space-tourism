import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  

  constructor(protected appComponent: AppComponent) { }

  ngOnInit(): void {
    window.onload = () => {
      this.appComponent.isMobileLayout = window.innerWidth < 768;
      this.appComponent.isDesktopLayout = window.innerWidth >= 1280 && window.innerHeight >= 720;
    };
    window.onresize = () => {
      this.appComponent.isMobileLayout = window.innerWidth < 768;
      this.appComponent.isDesktopLayout = window.innerWidth >= 1280 && window.innerHeight >= 720;
    };
    
  }

  onOpenMenuClick(){
    const menuitem = document.getElementById("menu");
    menuitem?.classList.add('opened');
    
  }

  onCloseMenuClick(){
    const menuitem = document.getElementById("menu");
    menuitem?.classList.remove('opened');

  }

}
