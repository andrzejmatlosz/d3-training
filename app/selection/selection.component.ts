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

    ngOnInit() {
        this.svg = d3.select('svg');
        console.log(this.svg);
    }

    public changeFill() {
        this.svg.selectAll('rect')
            .attr('height', function(d, i) {
                return 60 * i + 60;
            })
            .style('fill', 'red');
    }

    public addCircles() {
        let circlesLayer = this.svg.append('g')
            .attr('class', 'circles')
            .style('fill', 'red')
            .attr('transform', 'translate(200, 200)')
            .on('mouseenter', function() {
                console.log('mouseenter');
            });

        circlesLayer.append('circle')
            .attr('cx', 30)
            .attr('cy', 30)
            .attr('r', 30);
        circlesLayer.append('circle')
            .attr('cx', 70)
            .attr('cy', 50)
            .attr('r', 40)
            .style('fill', 'green');
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
