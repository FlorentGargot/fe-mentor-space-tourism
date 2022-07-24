import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMobileLayout = false;

  constructor() { }

  ngOnInit(): void {
    window.onresize = () => this.isMobileLayout = window.innerWidth < 768;
  }

}
