import React, {Component} from 'react';
import Plot from 'react-plotly.js/react-plotly';

const PlotComponent = (props) => {
        return (
            <div>
                <Plot
                    data={props.dataSeries}
                    layout={{
                        width: 800,
                        height: 600,
                        margin: {l: 60, r: 40, t: 20, b: 60},
                        showlegend: true,
                        xaxis: {
                            title: props.xTitle,
                            type: props.xType,
                            exponentformat: 'power'
                        },
                        yaxis: {
                            title: props.yTitle,
                            type: props.yType,
                            exponentformat: 'power'
                        }
                    }}
                    config={{displayModeBar: true}}
                /><br/>
            </div>
        );
}

export default PlotComponent;