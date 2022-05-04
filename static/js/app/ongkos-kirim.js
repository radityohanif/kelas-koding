$.ajax({
    type: "POST",
    url: "http://127.0.0.1:6007/data/ongkos-kirim",
    data: {
        origin: $("#origin").attr("value"),
        destination: $("#destination").attr("value"),
        weight: $("#weight").attr("value")
    },
    success: function (response) {
        createChart(response["cost"], response["service"])
    }
})

function createChart(cost, service) {
    var chartOngkir = echarts.init(document.getElementById('chartOngkir'))
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: service
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: cost,
                type: 'bar'
            }
        ]
    }
    chartOngkir.setOption(option)
}