import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public isOpened: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  headerAction(): void {
    this.isOpened = !this.isOpened;
  }
}
