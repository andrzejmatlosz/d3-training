import { HeatMapService } from './heat-map.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'myheat-map',
    templateUrl: 'app/heat-map/heat-map.component.html',
    styleUrls: [ 'app/heat-map/heat-map.component.css' ],
    providers: [ HeatMapService ]
})
export class HeatMapComponent implements OnInit {

    private svg;
    private data;

    constructor(private heatMapService: HeatMapService) { }

    public ngOnInit() {
        this.svg = d3.select('svg');
        this.data = this.heatMapService.getHeatMapData();
    }
}
