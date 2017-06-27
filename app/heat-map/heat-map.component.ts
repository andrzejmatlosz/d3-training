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
    private years = [];
    private ages = [];
    private dataStructure = {
        1: {},
        2: {}
    };

    private minPeopleValue = {
        1: Number.MAX_SAFE_INTEGER,
        2: Number.MAX_SAFE_INTEGER
    };

    private maxPeopleValue = {
        1: Number.MIN_SAFE_INTEGER,
        2: Number.MIN_SAFE_INTEGER
    };

    private margin = { left: 40, top: 10, right: 20, bottom: 30 };

    constructor(private heatMapService: HeatMapService) { }

    public ngOnInit() {
        this.svg = d3.select('svg');

        this.heatMapService.getHeatMapData().subscribe(data => {
            this.data = data;
            this.data.forEach(d => {
                if (this.years.indexOf(d.year) === -1) {
                    this.years.push(d.year);
                }

                if (this.ages.indexOf(d.age) === -1) {
                    this.ages.push(d.age);
                }

                if(!this.dataStructure[d.sex][d.year]) {
                    this.dataStructure[d.sex][d.year] = {};
                }
                
                this.dataStructure[d.sex][d.year][d.age] = d.people;

                if (d.people < this.minPeopleValue[d.sex]) {
                    this.minPeopleValue[d.sex] = d.people;
                }

                if (d.people > this.maxPeopleValue[d.sex]) {
                    this.maxPeopleValue[d.sex] = d.people;
                }

                this.dataStructure[d.sex][d.year][d.age] += d.people;
            });
        });
    }

    public showForMan() {

    }

    public showForWoman() {

    }
}
