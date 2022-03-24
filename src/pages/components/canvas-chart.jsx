import { CanvasJSChart, CanvasJS } from 'canvasjs-react-charts'

/**
 * 
 * @param {object} data Object returned by the API which contains Link data 
 * and associated LinkEvent data
 * @returns Array with objects needed by CanvasChart to be able to render the chart
 */
function formatData(data){
    if(data && Array.isArray(data)){
        return data.map(d => {             
            return {
             x: new Date(new Date(d.ClickDate).toDateString()), y: d.ClickCount
        }});
    };

    return [];
}

/**
 * Renders a chart with all the links events through time that a single Link has received.
 * 
 * @param {object} props Contains data returned by the API with Link and associated LinkEvent objects
 * @returns Chart with link events. X-axis will have Date information and Y-axis will have click count information.
 */
export function CanvasChart(props)
{
    const { linkStatistics } = props;  
    
    const transformedData =  formatData(linkStatistics);

    const options = {
        theme: "light2",					
        title:{
            text: "Links statistics"
        },
        axisX:{
            title: "Date"
        },
        axisY:{
            title: "Count"
        },
        data: [{
            type: "stepLine",
            xValueFormatString: "DD MMM YYYY",
            markerSize: 5,
            dataPoints: transformedData
        }]
    }      
    
    
  

    return linkStatistics ? <div style={ { clear: "both"} }><CanvasJSChart options = { options } /></div> : null;
}