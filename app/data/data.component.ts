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

    public textAttr(selection) {
        selection
            .attr('x', function(d, i) {
                return d.value + 10;
            })
            .text(function(d) {
                return d.value;
            })
    }

    public drawBarCharts() {
        let selection = this.svg.selectAll('g.one-data')
            .data(this.data, function(d, i) {
                return d.id;
            });

        // EXIT
        selection.exit()
            .transition()
            .duration(1000)
            .attr('width', 0)
            .remove();

        // ENTER
        let group = selection.enter()
            .append('g')
            .classed('one-data', true)
            .attr('transform', function(d, i) {
                return `translate(0, ${30 + 30 * i})`;
            });
        group
            .append('text')
            .attr('y', function(d, i) {
                return 10;
            })
            .style('opacity', 0)
            .transition()
            .delay(1000)
            .style('opacity', 1)
            .call(this.textAttr);

        group
            .append('rect')
            .attr('x', 0)
            .attr('height', 10)
            .attr('width', 0)
            .transition()
            .duration(1000)
            .delay(1000)
            .attr('width', function(d, i) {
                return d.value;
            });

        // UPDATE
        selection
            .select('rect')
            .transition()
            .delay(2000)
            .duration(1000)
            .attr('width', function(d, i) {
                return d.value;
            });
        selection
            .select('text')
            .datum((d) => d)
            .transition()
            .delay(2000)
            .duration(1000)
            .call(this.textAttr);
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
