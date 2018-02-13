import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'my-selection',
    templateUrl: 'app/selection/selection.component.html',
    styleUrls: [ 'app/selection/selection.component.css' ]
})
export class SelectionComponent implements OnInit {

    private svg;

    constructor(private refElememt: ElementRef) {
        
     }

    public ngOnInit() {
        this.svg = d3.select('svg');
    }

    public changeFill() {
        this.svg.selectAll('rect')
            .transition()
            .duration(2000)
            .attr('height', 150)
            .transition()
            .duration(2000)
            .style('fill', 'red')
            .style('stroke', 'blue');
    }

    public addCircles() {
        this.svg.append('circle')
            .attr('cx', 100)
            .attr('cy', 100)
            .style('fill', 'blue')
            .attr('r', 40);
    }

    public removeRectangles() {
        this.svg.selectAll('rect')
            .transition()
            .duration(2000)
            .attr('height', 0)
            .remove();
    }

    public removeAll() {
        this.svg.selectAll('*')
            .transition()
            .duration(2000)
            .style('opacity', 0)
            .remove();
    }
}
