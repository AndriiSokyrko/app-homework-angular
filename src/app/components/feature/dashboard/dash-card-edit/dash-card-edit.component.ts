import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DashboardService} from "../../../../services/dashboard/dashboard.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {DashboardModel} from "../../../../models/dashboard.model";
import {editDashboard} from "../../../../reducers/dashboard/dashboard.actions";
import {getDashboardById} from "../../../../reducers/dashboard/dashboard.selectors";
import {catchError, map, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-dash-card-edit',
  templateUrl: './dash-card-edit.component.html',
  styleUrls: ['./dash-card-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashCardEditComponent implements OnInit {
  message = ''
  dashboard: DashboardModel
  selectedColor:string[]
  constructor(private dashboardService: DashboardService,
              private store:Store,
              private  ref: ChangeDetectorRef,
              private route:Router,
              private routeAct: ActivatedRoute,
  ) { }

  formDashboard = new FormGroup({
    title: new FormControl( '', [Validators.required, Validators.minLength(5)]),
    description: new FormControl( '', [Validators.required, Validators.minLength(5)]),
  });

  ngOnInit(): void {
    if(localStorage.getItem('selectedColor')) this.selectedColor = JSON.parse(localStorage.getItem('selectedColor'))
    const id = Number(this.routeAct.snapshot.params['id'])
      this.store.select(getDashboardById,{id}).subscribe(dashboard=>{
        if(dashboard!==undefined){
          this.dashboard = dashboard
          this.formDashboard.controls['title'].setValue(dashboard.title)
          this.formDashboard.controls['description'].setValue(dashboard.description)
        }
      })

  }
  changeDashboard():DashboardModel{
    return  {
      id: this.dashboard.id,
      title: this.formDashboard.controls['title'].value,
      description: this.formDashboard.controls['description'].value,
      date: this.dashboard.date,
      "progress": this.dashboard.progress,
      "done": this.dashboard.done,
      archive:this.dashboard.archive
    }
  }
  editDashboardStore(dashboard){
    return this.store.dispatch(editDashboard(dashboard))
  }

      onSubmit() {
        const newDash = this.changeDashboard()
        this.dashboardService.editDashboard(newDash)
          .subscribe(dash => {
            this.editDashboardStore(newDash)
          })
        this.route.navigate(['/dashboard'])
      }

}

