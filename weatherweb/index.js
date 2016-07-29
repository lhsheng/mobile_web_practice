    var  now_temperature,address,now_weather,wind,
  	     pm_num,temperature1,weather2,air_quality,
  	     temperature2,weather3,temperature3,lastday,
         weather4,temperature4,clother,clother_advice,
         spy,spy_advice,sport,sport_advice,car,car_advice,
         wind2,wind3,wind4,today_img,img2,img3,img4,pm25data,pm25num;

         now_temperature=$(".now_temperature");
         address=$(".address");
         now_weather=$(".now_weather");
         wind=$(".wind");
         pm_num=$(".pm_num");
         air_quality=$(".air_quality");
         temperature1=$(".temperature1");
         weather2=$(".weather2");
         temperature2=$(".temperature2");
         weather3=$(".weather3");
         temperature3=$(".temperature3");
         lastday=$(".lastday");
         weather4=$(".weather4");
         temperature4=$(".temperature4");
         clother=$(".clother");
         clother_advice=$(".clother_advice");
         spy=$(".spy");
         spy_advice=$(".spy_advice");
         sport=$(".sport");
         sport_advice=$(".sport_advice");
         car=$(".car");
         car_advice=$(".car_advice");
         wind2=$(".wind2");
         wind3=$(".wind3");
         wind4=$(".wind4");
         today_img=$(".today_img");
         img2=$(".img2");
         img3=$(".img3");
         img4=$(".img4");
         pm25data=$(".pm25data")
document.addEventListener('DOMContentLoaded', boxwidth);

//搜索city
$("#search").on("click",function(){
  	$("#city").addClass("city") 
  	var city=$("#city").val();
  	if(city==""){
  		return;
  	}
  	else{
       city=city.replace(/ \s*/g,"");
       ajax(city,getdata);
  	}
})

ajax("广州",getdata);

function boxwidth(){
  	var devicewidth=document.documentElement.clientWidth;
  	if(devicewidth>640){
  	   devicewidth=640;
  	}
  	document.documentElement.style.fontSize = devicewidth/ 6.4 + 'px';
}

function ajax(str_address,getdata){
       $.ajax({
		        url:      'http://api.map.baidu.com/telematics/v3/weather?location='+str_address+'&output=json&ak=IhxffeaPrl1QELlq5KTD3Fm9&&mcode=FF:35:77:A2:E0:A8:BA:52:78:CE:DC:E6:83:DA:17:69:4D:8F:69:CF;edu.hrbeu.WeatherDemo',
		        dataType: "jsonp",
		        jsonp:    "callback",
		        success:  function (data) {
		                        getdata(data);  
		                  }
        })
}

function getdata(data){

	   if (data.status=="success") {
         address.html(data.results[0].currentCity);
         now_weather.html(data.results[0].weather_data[0].weather);
         wind.html(data.results[0].weather_data[0].wind);
         pm_num.html(data.results[0].pm25);
         air_quality.html(quality(data.results[0].pm25));
         now_weather.eq(1).html(data.results[0].weather_data[0].weather);
         temperature1.html(indexchange(data.results[0].weather_data[0].temperature));
         weather2.html(data.results[0].weather_data[1].weather);
         temperature2.html(indexchange(data.results[0].weather_data[1].temperature));
         weather3.html(data.results[0].weather_data[2].weather);
         temperature3.html(indexchange (data.results[0].weather_data[2].temperature));
         lastday.html(data.results[0].weather_data[3].date)
         weather4.html(data.results[0].weather_data[3].weather);
         temperature4.html(indexchange( data.results[0].weather_data[3].temperature));
         clother.html(data.results[0].index[0].zs);
         clother_advice.html(data.results[0].index[0].des);
         car.html(data.results[0].index[1].zs);
         car_advice.html(data.results[0].index[1].des);
         spy.html(data.results[0].index[5].zs);
         spy_advice.html(data.results[0].index[5].des);
         sport.html(data.results[0].index[4].zs);
         sport_advice.html(data.results[0].index[4].des);
         now_temperature.html(nowtemp( data.results[0].weather_data[0].date))
         wind.eq(1).html(data.results[0].weather_data[0].wind);
         wind2.html(data.results[0].weather_data[1].wind);
         wind3.html(data.results[0].weather_data[2].wind);
         wind4.html(data.results[0].weather_data[3].wind);
         today_img.prop("src",data.results[0].weather_data[0].dayPictureUrl);
         img2.prop("src",data.results[0].weather_data[1].dayPictureUrl);
         img3.prop("src",data.results[0].weather_data[2].dayPictureUrl);
         img4.prop("src",data.results[0].weather_data[3].dayPictureUrl);
         pm25num=data.results[0].pm25;
         pm25data.html(data.results[0].pm25);
        cancvas_all();
     }
     else{
        alert("something wrong");
      
     }

}

function indexchange(val){
    val=val.replace(/~/g,"/");
    return val;
}

function nowtemp(val){
   val=val.match(/\d{2}(?=℃)/g,".");
   return val[0];
}
function quality(val){
    var str_quality;
    val=parseInt(val);
    switch(true){
           case val<35:
          
           str_quality="优";
           break;
           case val>=35&&val<75:
           str_quality="良";
           break;
           case val>=75&&val<115:
           str_quality="轻度";
           break;
           case val>=115&&val<150:
           str_quality="中度";
           break;
           case val>=150&&val<250:
           str_quality="重度";
           break;
           case val>=250:
           str_quality="严重";
           break;
   }
    return str_quality;

}
function cancvas_all(){  

          var angle=2/3;
          setTimeout(function(){
                        var canvas=document.getElementById("air_data");
                        var ctr=canvas.getContext("2d");
                        ctr.clearRect(0,0,canvas.width,canvas.height);
                        canvasfn(angle);
                        if(angle<(0.003*pm25num)+(2/3)&&angle<7/3){
                          setTimeout(arguments.callee,30);
                          angle=angle+0.03;
                        }
                },30) 
          function canvasfn(a){
                var canvas=document.getElementById("air_data");
                var ctr=canvas.getContext("2d");
                ctr.strokeStyle="#e8e8e8";
                ctr.lineWidth=3;
                ctr.beginPath();
                ctr.arc(100,60,50,2*Math.PI/3,Math.PI/3);
                ctr.stroke();
                ctr.strokeStyle="#53c41a";
                ctr.beginPath();
                ctr.arc(100,60,50,2*Math.PI/3,Math.PI*a);
                ctr.stroke(); 
          }
} 
