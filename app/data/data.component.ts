import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'my-data',
    templateUrl: 'app/data/data.component.html',
    styleUrls: [ 'app/data/data.component.css' ]
})
export class DataComponent {

    public dataV1 = [
        { id: 0, value: 90 },
        { id: 1, value: 60 },
        { id: 2, value: 160 },
        { id: 3, value: 120 }
    ];

    public dataV2 = [
        { id: 0, value: 90 },
        { id: 1, value: 60 },
        { id: 2, value: 40 },
        { id: 3, value: 200 }
    ];

    public data = this.dataV1;
    private svg;

    constructor() { }

    public ngOnInit() {
        this.svg = d3.select('svg');
    }

    public drawBarCharts() {
        
    }

    public addInteractions() {

    }

    public addOne() {
        this.data.push({ id: this.data.length, value: this.randomOneElement() });
    }

    public removeOne() {
        this.data.splice(2, 1);
    }

    public changeData() {
        if (this.data === this.dataV1) {
            this.data = this.dataV2;
        } else {
            this.data = this.dataV1;
        }
    }

    public randomOneElement(): number {
        return 10 + Math.random() * 250 | 0;
    }

    public randomNewData() {
        let count = 1 + Math.random() * 10 | 0;
        this.data = [];
        for (let i = 0 ; i < count ; i++) {
            this.data.push({ id: i, value: this.randomOneElement() });
        }
    }
}
