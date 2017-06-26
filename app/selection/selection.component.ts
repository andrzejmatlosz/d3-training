import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'my-selection',
    templateUrl: 'app/selection/selection.component.html',
    styleUrls: [ 'app/selection/selection.component.css' ]
})
export class SelectionComponent implements OnInit {

    private svg;

    constructor() { }

    ngOnInit () {
        this.svg = d3.select('svg');
    }

    public changeFill() {
        this.svg.selectAll('rect')
            .attr('class', 'my-rect')
            .style('fill', 'red');
    }

    public addCircles() {
        this.svg.append('circle')
            .attr('cx', 200)
            .attr('cy', 200)
            .attr('r', 30)
            .style('fill', 'yellow');

        this.svg.append('circle')
            .attr('cx', 300)
            .attr('cy', 210)
            .attr('r', 30)
            .style('fill', 'yellow');
    }

    public removeRectangles() {
        this.svg.selectAll('rect').remove();
    }

    public removeAll() {
        this.svg.selectAll('*').remove();
    }
}
