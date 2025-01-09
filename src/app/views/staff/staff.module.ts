import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffPageComponent } from './staff-page/staff-page.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {SharedModule} from '../../shared/shared.module';
import {Carousel} from "primeng/carousel";


@NgModule({
  declarations: [
    StaffPageComponent
  ],
    imports: [
        CommonModule,
        StaffRoutingModule,
        CarouselModule,
        SharedModule,
        Carousel
    ]
})
export class StaffModule { }
