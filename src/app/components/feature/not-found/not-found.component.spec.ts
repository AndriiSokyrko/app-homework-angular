import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import {RouterModule} from "@angular/router";
import {TopMenuComponent} from "../../core/top-menu/top-menu.component";
import {StoreModule} from "@ngrx/store";
import {dashboardReducer} from "../../../reducers/dashboard/dashboard.reducer";
import {DashCardEditComponent} from "../dashboard/dash-card-edit/dash-card-edit.component";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {BoardService} from "../../../services/board/board.service";
import {HttpClient} from "@angular/common/http";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {SelectComponent} from "../../shared/select/select.component";

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>
  let service: DashboardService
  let httpMock: HttpTestingController
  let httpClient: HttpClient

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ,TopMenuComponent,DashCardEditComponent, SelectComponent],
      imports:[
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({dashboard:dashboardReducer})
      ],
    })
    .compileComponents();
    service =TestBed.inject(DashboardService)
    httpMock = TestBed.get(HttpTestingController)
    httpClient= TestBed.get(HttpClient)
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // fixture.detectChanges();

  });
});
