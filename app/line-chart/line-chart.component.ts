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

    private margin = { left: 30, top: 10, right: 20, bottom: 40 };
    private svg;
    private xScale;
    private xAxis;
    private yScale;
    private yAxis;
    private paintLayer;
    private line;

    private width;
    private height;

    constructor() { }

    public ngOnInit() {
        this.svg = d3.select('svg');
        this.width = this.svg.node().getBoundingClientRect().width;
        this.width = this.width - this.margin.left - this.margin.right;
        this.height = this.svg.node().getBoundingClientRect().height;
        this.height = this.height - this.margin.top - this.margin.bottom;

        window.addEventListener('resize', () => {
            this.width = this.svg.node().getBoundingClientRect().width;
            this.width = this.width - this.margin.left - this.margin.right;
            this.height = this.svg.node().getBoundingClientRect().height;
            this.height = this.height - this.margin.top - this.margin.bottom;
            this.xScale.domain([0, this.width]);
            this.xAxis
                .transition()
                .duration(2000)
                .call(d3.axisBottom(this.xScale))

            this.paintLayer.select('path')
                .transition()
                .attr('d', this.line);
        });
    }

    public drawLineChart() {
        this.drawXAxis();
        this.drawYAxis();
        this.preparePaintLayer();
        this.drawLine();
    }

    private drawXAxis() {
        let xValues = this.data.map(point => point.x);
        this.xScale = d3.scaleLinear()
            .domain([d3.min(xValues), d3.max(xValues)])
            .range([0, this.width]);

        this.xAxis = this.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(${this.margin.left},${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));
    }

    private drawYAxis() {
        let yValues = this.data.map(point => point.y);
        this.yScale = d3.scaleLinear()
            .domain([d3.min(yValues), d3.max(yValues)])
            .range([this.height, 0]);
        
        this.yAxis = this.svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
            .call(d3.axisLeft(this.yScale));
    }

    private preparePaintLayer() {
        this.paintLayer = this.svg.append('g')
            .classed('my-data', true)
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    }

    private drawLine() {
        this.line = d3.line()
            .x((d: any) => { return this.xScale(d.x); })
            .y((d: any) => { return this.yScale(d.y); });

        let xScale = this.xScale;

        this.paintLayer.append('path')
            .classed('line', true)
            .data([this.data])
            .attr('d', this.line)
            .on('mouseenter', function() {
                let xMouse = d3.mouse(this as any)[0];
                let yMouse = d3.mouse(this as any)[1];
                let x = xScale.invert(xMouse);
                console.log(x);
            });
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
