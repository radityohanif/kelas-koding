$.ajax({
    type: "GET",
    url: "http://127.0.0.1:6007/data/covid-19",
    success: function (response) {
        var labels = Array()
        var values = Array()  
        for(let i=0; i<Object.keys(response["update"]["total"]).length; i++) {
            labels.push(Object.keys(response["update"]["total"])[i])
            values.push(Object.values(response["update"]["total"])[i])
        }
        createBarChart(labels, values)   
        
        // Preprocessing data
        // [{ value: 1048, name: 'Search Engine' }, { value: 1048, name: 'Search Engine' }]
        var data = Array()
        for(let i=0; i<Object.keys(response["update"]["total"]).length; i++) {
            let item = Object()
            item["name"] = Object.keys(response["update"]["total"])[i]
            item["value"] = Object.values(response["update"]["total"])[i]
            data.push(item)
        }
        createPieChart(data)

    }
})

function createBarChart(labels, values) {
    var chartBar = echarts.init(document.getElementById("chartBar"))
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabels: true
        },
        xAxis: [
            {
                type: 'category',
                data: labels,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: values
            }
        ]
    }
    chartBar.setOption(option)
}

function createPieChart(data) {
    var chartPie = echarts.init(document.getElementById("chartPie"))
    var option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            bottom: 'bottom'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    chartPie.setOption(option)
}