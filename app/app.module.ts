import { LineChartComponent } from './line-chart/line-chart.component';
import { DataComponent } from './data/data.component';
import { SelectionComponent } from './selection/selection.component';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    declarations: [ 
        AppComponent,
        NavigationComponent,
        HomeComponent,
        SelectionComponent,
        DataComponent,
        LineChartComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }