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

    public ngOnInit() {
        this.svg = d3.select('svg');
    }

    public changeFill() {
        this.svg.selectAll('rect')
            .transition()
            .duration(2000)
            .delay(3000)
            .attr('height', '200px')
            .style('fill', 'red')
            .style('stroke', 'blue')
            .attr('width', '10px')
            .style('stroke-width', '5px');
    }

    public addCircles() {
        this.svg.append('circle')
            .attr('cx', '200px')
            .attr('cy', '0px')
            .style('fill', 'blue')
            .attr('r', '0px')
            .transition()
            .duration(2000)
            .attr('r', '20px')
            .transition()
            .duration(2000)
            .attr('cy', '200px')
            .on('end', function() {
                console.log('koniec');
            });
        // this.svg.append('circle')
        //     .attr('r', '30px')
        //     .attr('cx', '300px')
        //     .attr('cy', '200px')
        //     .style('fill', 'blue');
    }

    public removeRectangles() {
        this.svg.selectAll('rect')
            .remove();
    }

    public removeAll() {
        this.svg.selectAll('*')
            .remove();
    }
}
