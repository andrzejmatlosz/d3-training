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

    public rectAttributes(selection) {
        selection
            .attr('class', 'my-rect')
            .attr('x', 0)
            .attr('y', function(d, i) {
                return 10 + i * 20
            })
            .attr('height', 15)
            .attr('width', function(d, i) {
                return d.value;
            });
    }

    public drawBarCharts() {
        this.svg.selectAll('rect')
            .data(this.data)
            .enter()
            .append('rect')
            .call(this.rectAttributes);
    }

    public addInteractions() {
        let selection = this.svg
            .on('click', function() {
                d3.select(d3.event.target).style('fill', 'green');
            })

    }

    public addOne() {
        this.data.push({ id: this.data.length, value: this.randomOneElement() });

        this.svg.selectAll('rect')
            .data(this.data)
            .enter()
            .append('rect')
            .call(this.rectAttributes);
    }

    public removeOne() {
        this.data.splice(2, 1);

        let selection = this.svg.selectAll('rect')
            .data(this.data, this.keyFunction);

        selection
            .exit()
            .transition()
            .duration(1000)
            .attr('width', 0)
            .remove();

        selection
            .transition()
            .duration(1000)
            .delay(1000)
            .call(this.rectAttributes);
    }

    public changeData() {
        if (this.data === this.dataV1) {
            this.data = this.dataV2;
        } else {
            this.data = this.dataV1;
        }

        this.svg.selectAll('rect')
            .data(this.data)
            .attr('width', function(d, i) {
                return d.value;
            });
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

        // EXIT
        let exitSelection = selection
            .exit();

        if (exitSelection.empty()) {
            this.makeEnterUpdate(selection);
        } else {
            exitSelection.transition()
                .duration(1000)
                .attr('width', 0)
                .remove()
                .on('end', () => {
                    this.makeEnterUpdate(selection)
                });
        }
    }

    private makeEnterUpdate(selection) {
        // ENTER
        selection
          .enter()
            .append('rect')
            .call(this.rectAttributes)
            .attr('width', 0)
          .merge(selection)
            .transition()
            .duration(1000)
            .call(this.rectAttributes);
    }

    private keyFunction(d, i) {
        console.log(d);
        console.log(i);
        return d.id;
    }
}
