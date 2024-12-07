import { Component, OnInit } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import axios from 'axios';
import * as d3 from 'd3';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  imports: [TopMenuComponent]
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  async createChart() {
    try {
      const response = await axios.get('http://localhost:3000/api/marketdata');
      const data = response.data;

      // Log the data to the console to check what is being retrieved
      console.log('Data retrieved for the chart:', data);

      const svg = d3.select("#chart")
        .append("svg")
        .attr("width", 800)
        .attr("height", 400);

      const x = d3.scaleBand()
        .domain(data.map((d: any) => d.Year))
        .range([0, 800])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d: any) => +d.TotalMarketSize) || 0])
        .nice()
        .range([400, 0]);

      const tooltip = d3.select("#tooltip");

      svg.append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d: any) => x(d.Year) ?? 0)
        .attr("y", (d: any) => y(d.TotalMarketSize))
        .attr("width", x.bandwidth())
        .attr("height", (d: any) => 400 - y(d.TotalMarketSize))
        .attr("fill", "steelblue")
        .on("mouseover", (event: any, d: any) => {
          tooltip.transition().duration(200).style("opacity", .9);
          tooltip.html(`Year: ${d.Year}<br>ClinicalApplication: ${d.ClinicalApplication} USD Billion<br>SystemApplication: ${d.SystemApplication} USD Billion<br>TotalMarketSize: ${d.TotalMarketSize} USD Billion`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
          tooltip.transition().duration(500).style("opacity", 0);
        });

      svg.append("g")
        .attr("transform", "translate(0,400)")
        .call(d3.axisBottom(x));

      svg.append("g")
        .call(d3.axisLeft(y));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}