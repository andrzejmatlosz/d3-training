import { HttpModule } from '@angular/http';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DataComponent } from './data/data.component';
import { SelectionComponent } from './selection/selection.component';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { HeatMapComponent } from './heat-map/heat-map.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [ 
        AppComponent,
        NavigationComponent,
        HomeComponent,
        SelectionComponent,
        DataComponent,
        LineChartComponent,
        HeatMapComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }