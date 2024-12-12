import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-staff-film-filter',
  templateUrl: './staff-film-filter.component.html',
  styleUrl: './staff-film-filter.component.scss'
})
export class StaffFilmFilterComponent implements OnInit {
  @Input() profession: string = '';
  @Input() filmCount: number = 0;
  @Input() isActive: boolean = false;
  @Output() filterSelected: EventEmitter<string> = new EventEmitter<string>();

  public translatedStaffProfessions: { [key: string]: string } = {
    ACTOR: 'Актер',
    PRODUCER: 'Продюсер',
    DIRECTOR: 'Режиссер',
    WRITER: 'Сценарист',
    HRONO_TITR_MALE: 'Актер: Хроника, в титрах не указан',
    HIMSELF: 'Актер, играет самого себя'
  };


  constructor() {
  }

  ngOnInit() {

  }


  /** Передаем в родительской компонент выбранную профессию по клику */
  selectFilter() {
    this.filterSelected.emit(this.profession);
  }
}
