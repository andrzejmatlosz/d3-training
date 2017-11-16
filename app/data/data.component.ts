import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'my-data',
    templateUrl: 'app/data/data.component.html',
    styleUrls: [ 'app/data/data.component.css' ]
})
export class DataComponent {

    public dataV1 = [
        { id: 0, value: 9000 },
        { id: 1, value: 6000 },
        { id: 2, value: 16000 },
        { id: 3, value: 12000 }
    ];

    public dataV2 = [
        { id: 0, value: 90 },
        { id: 1, value: 60 },
        { id: 2, value: 40 },
        { id: 3, value: 200 }
    ];

    private margin = { left: 30, top: 40, right: 20, bottom: 40 };
    private width;
    private height;
    private x;
    private y;
    private yAxis;

    public data = this.dataV1;
    private svg;
    private mainLayer;

    constructor() { }

    public ngOnInit() {
        this.svg = d3.select('svg');

        this.readSize();

        this.x = d3.scaleLinear()
            .domain([0, d3.max(this.data, (d)=> d.value)])
            .range([0, this.width]);

        this.y = d3.scaleBand()
            .domain(this.data.map((d) => d.id.toString()))
            .range([0, this.height]);

        this.mainLayer = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

            window.onresize = () => {
                this.readSize();
                this.updateXYScales();
                this.drawBarCharts();
                this.yAxis
                    .transition()
                    .duration(2000)
                    .call(d3.axisLeft(this.y))
            }

        this.yAxis = this.svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
            .call(d3.axisLeft(this.y));
    }

    public readSize() {
        this.width = this.svg.node().getBoundingClientRect().width;
        this.width = this.width - this.margin.left - this.margin.right;
        this.height = this.svg.node().getBoundingClientRect().height;
        this.height = this.height - this.margin.top - this.margin.bottom;
    }

    public updateXYScales() {
        this.x.range([0, this.width]);
        this.y.range([0, this.height]);
    }

    public drawBarCharts() {
        var selection = this.mainLayer.selectAll('rect')
            .data(this.data, function(d) {
                return d.id;
            });
        
        //update
        selection
            .transition()
            .attr('y', (d, i) => {
                return this.y(d.id);
            })
            .attr('width', (d) => {
                return this.x(d.value);
            });

        //enter
        selection.enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', (d, i) => {
                return this.y(d.id);
            })
            .attr('height', 20)
            .style('fill', 'blue')
            // .attr('width', 0)
            // .transition()
            .attr('width', (d) => {
                console.log(this.x(d.value));
                return this.x(d.value);
            });

        //exit
        // selection.exit()
        //     .transition()
        //     .attr('width', 0)
        //     .remove();
    }

    public addInteractions() {

    }

    public addOne() {
        this.data.push({ id: this.data.length, value: this.randomOneElement() });
    }

    public removeOne() {
        this.data.splice(2, 1);
        this.drawBarCharts();
    }

    public changeData() {
        if (this.data === this.dataV1) {
            this.data = this.dataV2;
        } else {
            this.data = this.dataV1;
        }

        this.drawBarCharts();
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

        this.drawBarCharts();
    }
}
