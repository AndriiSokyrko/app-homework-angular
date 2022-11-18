import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DashboardService} from "../../../../services/dashboard/dashboard.service";
import {Store} from "@ngrx/store";
import {DashboardModel} from "../../../../models/dashboard.model";
import {createDashboard, editDashboard} from "../../../../reducers/dashboard/dashboard.actions";
import {Router} from "@angular/router";
import {catchError, map, throwError} from "rxjs";

@Component({
  selector: 'app-dash-card-add',
  templateUrl: './dash-card-add.component.html',
  styleUrls: ['./dash-card-add.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashCardAddComponent implements OnInit {
  message:string=''
  selectedColor:string[]

  formDashboard = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(private dashboardService: DashboardService,
              private store:Store,
              private  ref: ChangeDetectorRef,
              private route:Router
              ) { }

  ngOnInit(): void {
    if(localStorage.getItem('selectedColor')) this.selectedColor = JSON.parse(localStorage.getItem('selectedColor'))
  }
  createDashboard():DashboardModel{
    return  {
      title:this.formDashboard.controls['title'].value,
      description:this.formDashboard.controls['description'].value,
      date: new Date().toLocaleDateString(),
      "progress": false,
      "done": false,
      "archive":false
    }
  }
  addDashboardStore(dashboard){
    return this.store.dispatch(createDashboard(dashboard))
  }
  onSubmit(){
  const dashboard = this.createDashboard()
      return this.dashboardService.addDashboard(dashboard)
        .pipe(catchError(() => throwError('Error 400!')), map(db => db))
        .subscribe(item=>{
          this.store.dispatch(createDashboard(item))

          this.route.navigate(['/dashboard'],{ skipLocationChange: false })
        })
  }
}
