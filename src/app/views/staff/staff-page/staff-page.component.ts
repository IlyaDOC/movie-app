import {Component, inject, OnInit} from '@angular/core';
import {StaffService} from '../../../shared/services/staff.service';
import {ActivatedRoute} from '@angular/router';
import {StaffType} from '../../../types/staff.type';
import {ErrorResponseType} from '../../../types/error-response.type';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrl: './staff-page.component.scss'
})
export class StaffPageComponent implements OnInit {
  private staffService: StaffService = inject(StaffService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  public staffInfo: StaffType;
  constructor() {
    this.staffInfo = {
      personId: 0,
      webUrl: '',
      nameRu: '',
      nameEn: '',
      sex: '',
      posterUrl: '',
      growth: '',
      birthday: '',
      death: '',
      age: 0,
      birthplace: '',
      deathplace: '',
      hasAwards: 0,
      profession: '',
      facts: [
        ''
      ],
      spouses: [
        {
          personId: 0,
          name: '',
          divorced: false,
          divorcedReason: '',
          sex: '',
          children: 0,
          webUrl: '',
          relation: ''
        }
      ],
      films: [
        {
          filmId: 0,
          nameRu: '',
          nameEn: '',
          rating: '',
          general: false,
          description: '',
          professionKey: ''
        }
      ]
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.getStaffInfoData(params['id']);
      })
  }

  getStaffInfoData(staffId: string) {
    this.staffService.getStaffInfo(staffId)
      .subscribe({
        next: (data: StaffType | ErrorResponseType)=> {
          this.catchErrorInResponse(data as ErrorResponseType);
            this.staffInfo = data as StaffType;
            console.log(this.staffInfo);

        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка получения данных');
          }
        }
      })
  }


  /** Функция для обработки ошибочного ответа.
   * Требуется в связи постоянно повторяющимся фрагментом кода в каждом запросе */
  catchErrorInResponse(data: ErrorResponseType) {
    let error = null;
    if ((data as ErrorResponseType).message !== undefined) {
      error = (data as ErrorResponseType).message;
    }
    if (error) {
      this._snackBar.open(error);
      throw new Error(error);
    }
  }
}
