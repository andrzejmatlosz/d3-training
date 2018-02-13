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
    private xAxisLayer;
    private yScale;
    private yAxis;
    private yAxisLayer;
    private paintLayer;
    private line;
    private lineFn; 
    private width;
    private height;

    constructor() { }

    public ngOnInit() {
        this.svg = d3.select('svg');
        this.readSvgSize();
        window.onresize = this.refresh.bind(this);
    }

    public drawLineChart() {
        this.drawXAxis();
        this.drawYAxis();
        this.preparePaintLayer();
        this.drawLine();
    }

    private refresh() {
        this.readSvgSize();
        const xMinMax = d3.extent(this.data, d => d.x);
        this.xScale
            .domain(xMinMax)
            .range([0, this.width]);
        this.xAxisLayer
            .transition()
            .duration(2000)
            .call(d3.axisBottom(this.xScale));

        const yMinMax = d3.extent(this.data, d => d.y);
        this.yScale
            .range([this.height, 0])
            .domain(yMinMax);
        this.yAxisLayer
            .transition()
            .duration(2000)
            .call(d3.axisLeft(this.yScale));

        this.line
            .datum(this.data)
            .transition()
            .duration(2000)
            .attr('d', this.lineFn);
    }

    private readSvgSize() {
        const bbox = this.svg.node().getBoundingClientRect();
        this.width = bbox.width - this.margin.left - this.margin.right;
        this.height = bbox.height - this.margin.top - this.margin.bottom;
    }

    private drawXAxis() {
        const xMinMax = d3.extent(this.data, d => d.x);
        this.xScale = d3.scaleLinear()
            .domain(xMinMax)
            .range([0, this.width]);

        this.xAxisLayer = this.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(${this.margin.left},${this.margin.top + this.height})`);
        this.xAxis = this.xAxisLayer.call(d3.axisBottom(this.xScale));
    }

    private drawYAxis() {
        const yMinMax = d3.extent(this.data, d => d.y);
        this.yScale = d3.scaleLinear()
            .domain(yMinMax)
            .range([this.height, 0]);

        this.yAxisLayer = this.svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
        this.yAxis = this.yAxisLayer.call(d3.axisLeft(this.yScale));
    }

    private preparePaintLayer() {
        this.paintLayer = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    }

    private drawLine() {
        this.lineFn = d3.line()
            .x((d) => { return this.xScale((d as any).x); })
            .y((d) => { return this.yScale((d as any).y); });

        this.line = this.paintLayer.append("path")
            .datum(this.data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", this.lineFn);
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

        this.refresh();
    }
}
