import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {DashboardModel} from "../../../models/dashboard.model";
import {getDashboards} from "../../../reducers/dashboard/dashboard.selectors";
import {Observable} from "rxjs";
import {getColor} from "../../../reducers/color/color.selector";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  selectedColor:string[] =JSON.parse(localStorage.getItem('selectedColor'))
  dashboards: Observable<DashboardModel[]>
  filter: string = ''
  sortName: string=''
  fieldName: string =''
  constructor(private store: Store,
              private router: Router,
              private dashboardService: DashboardService,
              private ref: ChangeDetectorRef
    ) {
    this.selectedColor =JSON.parse(localStorage.getItem('selectedColor'))
  }

  changeStrFilter(val){
    return this.filter = val
  }
  changeSortName(val){
    return this.sortName= val
  }
  changeFieldName(val){
    return this.fieldName= val
  }
  updatePage(){
    this.ref.markForCheck()
  }
    ngOnInit(): void {
      this.store.select(getColor).subscribe(color=> {
        this.selectedColor = color
        this.ref.markForCheck()
      })
     this.dashboards = this.store.select(getDashboards)

  }


}
