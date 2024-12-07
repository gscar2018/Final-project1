import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import * as d3 from 'd3';
import { TopMenuComponent } from '../top-menu/top-menu.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  standalone: true,
  imports: [TopMenuComponent]
})
export class SummaryComponent implements OnInit {
  healthPerformanceData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.fetchHealthPerformanceData();
  }

  async fetchHealthPerformanceData() {
    if (!this.isTokenValid()) {
      console.error('Invalid token');
      return;
    }

    try {
      const response = await axios.get('/api/healthperformance');
      this.healthPerformanceData = response.data;
      this.createChart();
    } catch (error) {
      console.error('Error fetching health performance data:', error);
    }
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    // Add your token validation logic here
    return token !== null && token !== '';
  }

  createChart(): void {
    const data = this.healthPerformanceData;

    const width = 800;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<any>()
      .value((d: any) => d.OverallPerformance);

    const arc = d3.arc<any>()
      .innerRadius(0)
      .outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    const arcs = svg.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => color(d.data.Year))
      .on("mouseover", (event: any, d: any) => {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`
          <strong>Year:</strong> ${d.data.Year}<br>
          <strong>Hospital Admissions:</strong> ${d.data.HospitalAdmissions.toFixed(2)}<br>
          <strong>Cardiovascular Survival:</strong> ${d.data.CardiovascularSurvival.toFixed(2)}%<br>
          <strong>Cancer Survival:</strong> ${d.data.CancerSurvival.toFixed(2)}%<br>
          <strong>Treatable Mortality:</strong> ${d.data.TreatableMortality.toFixed(2)}%<br>
          <strong>GDP Growth:</strong> ${d.data.GDPGrowth.toFixed(2)}%<br>
          <strong>Overall Performance:</strong> ${d.data.OverallPerformance.toFixed(2)}%
        `)
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    arcs.append("text")
      .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .text((d: any) => d.data.Year);
  }
}