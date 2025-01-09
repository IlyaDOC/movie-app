import {Component, inject, Input, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {FactItemType} from '../../../types/fact-item.type';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-film-fact-and-blooper',
  templateUrl: './film-fact-and-blooper.component.html',
  styleUrl: './film-fact-and-blooper.component.scss'
})
export class FilmFactAndBlooperComponent implements OnInit {

  private router: Router = inject(Router)
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  @Input() fact:FactItemType = {
    text: '',
    type: '',
    spoiler: false
  }

  @Input() title: string = '';
  @Input() facts: { [key: string]: FactItemType[] } = {};
  @Input() typeOf: string = '';

  public filmId: string = '';

  constructor() {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.filmId = params['filmId'];
    })
  }


  /** Удаляем класс spoiler у fact-item по клику*/
  removeSpoilerWrapper(fact: any):void {
    if (fact.spoiler) {
      fact.spoiler = false;
    }
  }


}
