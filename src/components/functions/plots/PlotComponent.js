import React from 'react';
import Plot from 'react-plotly.js/react-plotly';

const PlotComponent = (props) => {
        return (
            <div>
                <Plot
                    data={props.dataSeries}
                    useResizeHandler
                    style={{ width: '100%', height: '100%' }}
                    layout={{
                        autosize: true,
                        margin: {l: 60, r: 40, t: 20, b: 60},
                        showlegend: true,
                        dragmode: false,
                        legend : {
                            orientation: 'h',
                            y:-0.15
                        },
                        xaxis: {
                            title: props.xTitle,
                            type: props.xType,
                            exponentformat: 'power',
                            automargin: true
                        },
                        yaxis: {
                            title: props.yTitle,
                            type: props.yType,
                            exponentformat: 'power',
                            automargin: true
                        }
                    }}
                    config={{displayModeBar: true, showSendToCloud: true}}
                /><br/>
            </div>
        );
}

export default PlotComponent;
