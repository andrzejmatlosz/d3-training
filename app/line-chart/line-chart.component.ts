import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'my-line-chart',
    templateUrl: 'app/line-chart/line-chart.component.html',
    styleUrls: [ 'app/line-chart/line-chart.component.css' ]
})
export class LineChartComponent implements OnInit {

    public data = [
        { x: 0, y: 90 },
        { x: 10, y: 120 },
        { x: 20, y: 10 },
        { x: 30, y: 30 },
        { x: 40, y: 160 },
        { x: 50, y: 110 },
        { x: 60, y: 100 },
        { x: 70, y: 60 },
        { x: 80, y: 30 },
        { x: 90, y: 40 },
        { x: 100, y: 150 },
        { x: 110, y: 120 }
    ];

    private margin = { left: 60, top: 10, right: 20, bottom: 40 };
    private svg;
    private xScale;
    private xAxis;
    private yScale;
    private yAxis;
    private paintLayer;
    private line;

    constructor() { }

    public ngOnInit() {
        this.svg = d3.select('svg');
    }

    public drawLineChart() {
        this.drawXAxis();
        this.drawYAxis();
        this.preparePaintLayer();
        this.drawLine();
    }

    private drawXAxis() {

    }

    private drawYAxis() {

    }

    private preparePaintLayer() {
        
    }

    private drawLine() {

    }

    public randomOneElement(): number {
        return Math.random() * 200 | 0;
    }

    public randomNewData() {
        let count = 1 + Math.random() * 10 | 0;
        this.data = [];
        for (let i = 0 ; i < count ; i++) {
            this.data.push({ x: i * 10, y: this.randomOneElement() });
        }
    }
}
