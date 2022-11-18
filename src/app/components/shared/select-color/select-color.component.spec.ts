import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColorComponent } from './select-color.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../reducers/app.state";
import {changeColor} from "../../../reducers/color/color.action";
import {getColor} from "../../../reducers/color/color.selector";
import {useSelectedColor} from "../button/mocks/boards";

describe('SelectColorComponent', () => {
  let component: SelectColorComponent;
  let fixture: ComponentFixture<SelectColorComponent>;
  let mockStore: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectColorComponent ],
      providers:[
        provideMockStore(),
      ]
    })
    .compileComponents();
    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});
    mockStore.overrideSelector(getColor, useSelectedColor)
    fixture = TestBed.createComponent(SelectColorComponent);
    component = fixture.componentInstance;
    component.selectedColor=useSelectedColor
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('changeColor spec emit',()=>{
    // const event = spyOn(component.setNewColor,'emit')
    fixture.detectChanges()
    component.changeColor("#111,#222,#333")
    expect(mockStore.dispatch).toHaveBeenCalledWith(changeColor({color:useSelectedColor}))
    // expect(event).toHaveBeenCalledWith(useSelectedColor)
  })
});
