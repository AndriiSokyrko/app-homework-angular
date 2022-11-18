import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../reducers/app.state";
import {getColor} from "../../../reducers/color/color.selector";
import {useSelectedColor} from "../button/mocks/boards";

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockStore: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      providers:[
        provideMockStore(),
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});
    mockStore.overrideSelector(getColor, useSelectedColor)

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.selectedColor = ['#111','#222','#333']
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('@Input should create', () => {
    expect(component.selectedColor).toEqual(['#111','#222','#333']);
  });
});
