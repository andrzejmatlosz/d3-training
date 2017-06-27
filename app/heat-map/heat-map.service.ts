import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class HeatMapService {
    constructor(private http: Http) {}

    getHeatMapData(): Observable<any> {
      return this.http.get('assets/population.json').map((r: Response) => {
        return r.json();
      });
    }
}