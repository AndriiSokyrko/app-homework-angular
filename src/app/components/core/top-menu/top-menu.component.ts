import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {getDashboardById} from "../../../reducers/dashboard/dashboard.selectors";
import {getColor} from "../../../reducers/color/color.selector";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMenuComponent implements OnInit {

  @Output() changeFilter = new EventEmitter<string>()
  @Output() changeSORT = new EventEmitter<string>()
  @Output() changeField = new EventEmitter<string>()
  @Input() filter:string =''
  selectedColor:string[]
  dashboardName: string

  constructor(private ref:ChangeDetectorRef,
              private routeAct: ActivatedRoute,
              private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.store.select(getColor).subscribe(color=> {
      this.selectedColor = color
      this.ref.markForCheck()
    })
    const id  = Number(this.routeAct.snapshot.params['id']) //id dashboard
    this.store.pipe(select(getDashboardById,{id})).subscribe(item=> {
      if(item!==undefined) this.dashboardName = item.title
    })
    this.ref.markForCheck()
  }
  changeInput(val:string ){
    this.changeFilter.emit(val)
  }
  selOption(val){
    this.changeField.emit(val)
  }
  selDESC(){
    this.changeSORT.emit('desc')

  }
  selASC(){
    this.changeSORT.emit('asc')

  }
  logout(){
    localStorage.removeItem('login')
    this.router.navigate(['login'])
  }
}
