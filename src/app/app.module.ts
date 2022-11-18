import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "./components/components.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import {CoreModule} from "./components/core/core.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    CoreModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
