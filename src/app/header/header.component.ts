import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMobileLayout = false;
  isDesktopLayout = false;

  constructor() { }

  ngOnInit(): void {
    window.onload = () => {
      this.isMobileLayout = window.innerWidth < 768;
      this.isDesktopLayout = window.innerWidth >= 1024
    };
    window.onresize = () => {
      this.isMobileLayout = window.innerWidth < 768;
      this.isDesktopLayout = window.innerWidth >= 1024
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
