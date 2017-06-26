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
        this.svg.selectAll('rect')
            .data(this.data, this.keyFunction)
          .enter()
            .append('rect')
            .call(this.rectAttributes);
    }

    public addInteractions(selection) {
        if (!selection) {
            selection = this.svg.selectAll('rect');
        }

        selection
            .on('mouseenter', function() {
                d3.select(this)
                    .style('fill', 'red');
            })
            .on('mouseleave', function() {
                d3.select(this)
                    .style('fill', 'yellow');
            })
            .on('click', function() {
                d3.select(this)
                    .style('fill', 'green');
            });
    }

    public addOne() {
        this.data.push({ id: this.data.length, value: this.randomOneElement() });
        this.svg.selectAll('rect')
            .data(this.data, this.keyFunction)
          .enter()
            .append('rect')
            .call(this.rectAttributes)
            .call(this.addInteractions);
    }

    public removeOne() {
        this.data.splice(2, 1);
        this.svg.selectAll('rect')
            .data(this.data, this.keyFunction)
          .exit()
            .remove();
    }

    public changeData() {
        if (this.data === this.dataV1) {
            this.data = this.dataV2;
        } else {
            this.data = this.dataV1;
        }

        let selection = this.svg.selectAll('rect')
            .data(this.data, this.keyFunction);
        selection
            .call(this.updateRectAttributes);
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

        let selection = this.svg.selectAll('rect')
            .data(this.data, this.keyFunction);

        // UPDATE
        selection
            .enter()
            .append('rect')
            .call(this.rectAttributes)
            .attr('width', 0)
          .merge(selection)
            .transition()
            .duration(1000)
            .call(this.rectAttributes);

        // REMOVE
        selection
            .exit()
            .transition()
            .duration(1000)
            .attr('width', 0)
            .remove();
    }

    private rectAttributes(selection) {
        selection
            .attr('y', function(d, i) {
                return i * 20 + 10;
            })
            .attr('width', function(d) { return d.value; })
            .attr('height', 15)
            .style('fill', 'yellow')
            .style('stoke', 'blue')
            .style('stoke-width', '2px');
    }

    private updateRectAttributes(selection) {
        selection
            .transition()
            .duration(1000)
            .attr('width', function(d) { return d.value; });
    }

    private keyFunction(d, i) {
        return d.id;
    }
}
