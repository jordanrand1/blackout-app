import React from 'react'
import { PieChart, Pie, Sector, Cell } from 'recharts'

class Chart extends React.Component {
  render() {
    const { kills, deaths } = this.props.profile.mp.lifetime.all
    const data = [{name: 'kills', value: kills}, {name: 'deaths', value: deaths}]
    const COLORS = ['#D6460B', 'white'];
    const RADIAN = Math.PI / 180; 
    return (
      <PieChart width={200} height={230} onMouseEnter={this.onPieEnter} style={{backgroundColor: "#202021"}}>
      <Pie
        data={data} 
        cx={95} 
        cy={120} 
        startAngle={0}
        endAngle={360}
        innerRadius={60}
        outerRadius={80} 
        fill="white"
        paddingAngle={1}
        label
      >
      {
        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
      }
      </Pie>
    </PieChart>
    )
  }
}

export default Chart

