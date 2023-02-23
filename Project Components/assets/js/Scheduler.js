


var classList = {};

dayjs.extend(window.dayjs_plugin_customParseFormat);
//double check removing class
function removePrompt(){
        let r = jQuery.Deferred();
    
        p = $("#removePrompt");
        p.modal("show");
    
         $("#removePromptNo").off("click").click(()=>{
            p.modal("hide");
        })
    
        $("#removePromptYes").off("click").click(()=>{
            p.modal("hide");
            r.resolve(true);
        })
        
       
    
        $("#removePromptClear").off("click").click(()=>{
            p.modal("hide");
            r.resolve(false);
        })
        
        return r.promise();
}

///confirm class removal
function confirmRemove(e){
    removePrompt().then(a=>{
        if(a)
            e.closest("li").remove()
        else
            $("#classList").empty()
            sched();
    })

}



//close search results
$("#searchResultsClose").click(()=>{
    $("#searchResults").removeClass("show");
})

//search for classes
function doSearch(){
    $("#searchSpinner").css("display","inline-block");
    $("#searchButtonText").css("display","none");
    let term = $("#searchBox").val();

    $.ajax({
     "timeout": 5000,
     "error": ()=>{
            $("#searchSpinner").css("display","none");
            $("#searchButtonText").css("display","inline-block");
            alert("Error connecting to server. Please try again later.");
     },
     "async": true,
     "crossDomain": true,
     "url": "https://young-thicket-94378.herokuapp.com/https://classes.colorado.edu/api/?page=fose&route=search",
     "method": "POST",
     "headers": {
       "Content-Type": "application/json",
       "x-requested-with": "classes.colorado.edu"
     },
     "processData": false,
     "data": `{\"other\":{\"srcdb\":\"2227\"},\"criteria\":[{\"field\":\"keyword\",\"value\":\"${term}\"}]}`
   }).done(response=>{
       if(response.count == 0){
           alert("No results found");
           $("#searchSpinner").css("display","none");
           $("#searchButtonText").css("display","inline-block");
           return
       }
       
       $("#searchList").empty();
       $("#searchResults").addClass("visible").addClass("show");
       $("#searchResults").animate({ scrollTop: 0 }, "fast");
       let lastCode = "";
       response.results.forEach(a=>{
           if(lastCode != a.code){
               addResult(a.code, a.title);
               lastCode = a.code;
           }
               
       });
       $("#searchSpinner").css("display","none");
       $("#searchButtonText").css("display","inline-block");
   });
}

//search when enter is pressed
$("#searchBox").keypress(e=>{
    if(e.which === 13){ //enter keypress
		doSearch();
    }
});


//add result to search results
function addResult(code, title){
    let card = `<li>
    <div class="card" style="margin-bottom: 10px;">
        <div class="card-body" style="margin-top: 0px;">
            <h4 class="card-title">${code}</h4>
            <h6 class="text-muted card-subtitle mb-2">${title}</h6><button class="btn btn-primary float-end" type="button" style="padding-left: 10px;padding-right: 10px;padding-bottom: 4px;padding-top: 4px;" onclick="addClass($(this))">Add</button>
        </div>
    </div>
</li>`

    $("#searchList").append(card);
}

//add class from search to schedule
function addClass(card){
    let id = card.siblings("h4").text();
    let name = card.siblings("h6").text();
   let classCard = `<li>
    <div class="card" style="margin-bottom: 10px;">
        <div class="card-body" style="margin-top: 0px;"><i class="fa fa-remove fs-5 text-danger float-end btn" style="width: 20px;height: 20px;padding: 0px;" onclick="confirmRemove(this)"></i>
            <h4 class="card-title">${id}</h4>
            <h6 class="text-muted card-subtitle mb-2">${name}</h6><button class="btn btn-primary float-end btn-sm" type="button" style="padding-left: 10px;padding-right: 10px;padding-bottom: 4px;padding-top: 4px;" onclick="showClassInfo($(this))">
            <span class="spinner-border spinner-border-sm" style="display: none;" role="status" aria-hidden="true"></span>
            <span class="t" style="display: block;">Expand</span>
            </button>
        </div>
    </div>
</li>`;
    
    $("#classList").append(classCard);
    $("#searchResults").removeClass("show");
    sched();
}


function sched(){
    var listEvent = calendar.getEvents();
listEvent.forEach(event => { 
  event.remove()
});

var color = randomColor();

    classList = [];
    $("#classList").children().each(function(index){
        let code = $(this).children().first().children().first().children().first().siblings("h4").text(); 
        console.log(code)
        $.ajax({
            "timeout": 5000,
            "error": ()=>{

                alert("Error connecting to server. Please try again later.");
            },
            "async": false,
            "crossDomain": true,
            "url": "https://young-thicket-94378.herokuapp.com/https://classes.colorado.edu/api/?page=fose&route=details",
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "x-requested-with": "classes.colorado.edu"
            },
            "processData": false,
            "data": `{\"group\":\"code:${code}\"}`
          }).done(response=>{
              if(response.count == 0){
                  alert("No results found");

                  return
              }

              let LECtimes = new Set();
              let RECtimes = new Set();
            

              response.allInGroup.forEach(a=>{
                  if(a.schd == "LEC"){
                      if(a.meets != "Cancelled")
                      LECtimes.add(a.meets)
                     // console.log(LECtimes);
                  }else{
                    if(a.meets != "Cancelled")
                    RECtimes.add(a.meets)
                  }
              });
              

              let now = new Date();
              let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
              let lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

              LECtimes.forEach(e=>{
                   console.log(e)
                    let days = e.substring(0, e.indexOf(" "));
                    let end = e.substring(e.indexOf("-")+1)
                    let start = e.substring(e.indexOf(" ")+1, e.indexOf("-"))
                    let day = lastSunday.getDate()

                    if(start.slice(-1) == "a" || start.slice(-1)  == "p")
                        start += "m"
                    if(end.slice(-1) == "a" || end.slice(-1)  == "p")
                        end += "m"
                    if(!start.includes("a") || !start.includes("p"));
                         start += end.substring(end.indexOf("m")-1)

                    //start = start.substring(0, start.indexOf("m")-1)+1;

                    start = lastSunday.getFullYear().toString()+" "+(lastSunday.getMonth()+1).toString()+" "+start;
                    end = lastSunday.getFullYear().toString()+" "+(lastSunday.getMonth()+1).toString()+" "+end;
                    // console.log(start);
                    // console.log(end);
                    console.log(days)

                    if(days.includes("M")){
                       // day = 1;
                        calendar.addEvent({
                            title: code+" LEC",
                            start: dayjs(start+" "+(day+1).toString(), "YYYY M H:mma D").toDate(),
                            end: dayjs(end+" "+(day+1).toString(), "YYYY M H:mma D").toDate(),
                            eventColor: `#A86658`
                        })
                    }  
                     if(days.includes("W")){
                      //  day = 3;
                        calendar.addEvent({
                            title: code+" LEC",
                            start: dayjs(start+" "+(day+3).toString(), "YYYY M H:mma D").toDate(),
                            end: dayjs(end+" "+(day+3).toString(), "YYYY M H:mma D").toDate(),
                            eventColor: `#A86658`
                        })
                    } 
                     if(days.includes("Th")){
                       // day = 4;
                        calendar.addEvent({
                            title: code+" LEC",
                            start: dayjs(start+" "+(day+4).toString(), "YYYY M H:mma D").toDate(),
                            end: dayjs(end+" "+(day+4).toString(), "YYYY M H:mma D").toDate(),
                            eventColor: `#A86658`
                        })
                    }   
                     if((days.includes("T") && !days.includes('Th')) || days.split('T') == 2){
                       // day = 2;
                        calendar.addEvent({
                            title: code+" LEC",
                            start: dayjs(start+" "+(day+2).toString(), "YYYY M H:mma D").toDate(),
                            end: dayjs(end+" "+(day+2).toString(), "YYYY M H:mma D").toDate(),
                            eventColor: `#A86658`
                        })
                    }   
                     if(days.includes("F")){
                      //  day = 5;
                        calendar.addEvent({
                            title: code+" LEC",
                            start: dayjs(start+" "+(day+5).toString(), "YYYY M H:mma D").toDate(),
                            end: dayjs(end+" "+(day+5).toString(), "YYYY M H:mma D").toDate(),
                            eventColor: `#A86658`
                        })
                    }
                       console.log("TEST")
                    

                     
                        

                        //console.log(start+" "+day.toString())
                      //  console.log(dayjs(start+" "+day.toString(), "YYYY M H:mma D"))
                      

                   // console.log(color)
                    // calendar.addEvent({
                    //     title: code+" REC",
                    //     start: dayjs(start+" "+day.toString(), "YYYY M H:mma D").toDate(),
                    //     end: dayjs(end+" "+day.toString(), "YYYY M H:mma D").toDate(),
                    //     eventColor: `#A86658`
                    // })
                    calendar.render();


              });

              RECtimes.forEach(e=>{
               // console.log(e)
                let days = e.substring(0, e.indexOf(" "));
                let end = e.substring(e.indexOf("-")+1)
                let start = e.substring(e.indexOf(" ")+1, e.indexOf("-"))
                let day = lastSunday.getDate()

                if(start.slice(-1) == "a" || start.slice(-1)  == "p")
                    start += "m"
                if(end.slice(-1) == "a" || end.slice(-1)  == "p")
                    end += "m"
                if(!start.includes("a") || !start.includes("p"));
                     start += end.substring(end.indexOf("m")-1)

                //start = start.substring(0, start.indexOf("m")-1)+1;

                start = lastSunday.getFullYear().toString()+" "+(lastSunday.getMonth()+1).toString()+" "+start;
                end = lastSunday.getFullYear().toString()+" "+(lastSunday.getMonth()+1).toString()+" "+end;
                // console.log(start);
                // console.log(end);
                
                
                if(days.includes("M")){
                    // day = 1;
                     calendar.addEvent({
                         title: code+" REC",
                         start: dayjs(start+" "+(day+1).toString(), "YYYY M H:mma D").toDate(),
                         end: dayjs(end+" "+(day+1).toString(), "YYYY M H:mma D").toDate(),
                         eventColor: `#A86658`
                     })
                 }  
                  if(days.includes("W")){
                   //  day = 3;
                     calendar.addEvent({
                         title: code+" REC",
                         start: dayjs(start+" "+(day+3).toString(), "YYYY M H:mma D").toDate(),
                         end: dayjs(end+" "+(day+3).toString(), "YYYY M H:mma D").toDate(),
                         eventColor: `#A86658`
                     })
                 } 
                  if(days.includes("Th")){
                    // day = 4;
                     calendar.addEvent({
                         title: code+" REC",
                         start: dayjs(start+" "+(day+4).toString(), "YYYY M H:mma D").toDate(),
                         end: dayjs(end+" "+(day+4).toString(), "YYYY M H:mma D").toDate(),
                         eventColor: `#A86658`
                     })
                 }   
                  if((days.includes("T") && !days.includes('Th')) || days.split('T') == 2){
                    // day = 2;
                     calendar.addEvent({
                         title: code+" REC",
                         start: dayjs(start+" "+(day+2).toString(), "YYYY M H:mma D").toDate(),
                         end: dayjs(end+" "+(day+2).toString(), "YYYY M H:mma D").toDate(),
                         eventColor: `#A86658`
                     })
                 }   
                  if(days.includes("F")){
                   //  day = 5;
                     calendar.addEvent({
                         title: code+" REC",
                         start: dayjs(start+" "+(day+5).toString(), "YYYY M H:mma D").toDate(),
                         end: dayjs(end+" "+(day+5).toString(), "YYYY M H:mma D").toDate(),
                         eventColor: `#A86658`
                     })
                 }
                

                 
                    

                   // console.log(start+" "+day.toString())
                   // console.log(dayjs(start+" "+day.toString(), "YYYY M H:mma D"))
                  


                // calendar.addEvent({
                //     title: code+" REC",
                //     start: dayjs(start+" "+day.toString(), "YYYY M H:mma D").toDate(),
                //     end: dayjs(end+" "+day.toString(), "YYYY M H:mma D").toDate(),
                //     eventColor: color
                // })
                calendar.render();


          });
                    


              });
            






          });


    }






//show detailed class info in modal
function showClassInfo(card, ccode){
    let spinner = $(card).children(".spinner-border");
    let btnText = $(card).find(".t");
    spinner.css("display","inline-block");
    btnText.css("display","none");
    info = $("#classInfo");
    info.find(".modal-body").empty();
    let code = card.siblings("h4").text();
    let title = card.siblings("h6").text();
    info.find("#cId").text(code);
    info.find("#cName").text(title);
    if(ccode) code = ccode
    $.ajax({
        "timeout": 5000,
        "error": ()=>{
            spinner.css("display","none");
            btnText.css("display","inline-block");
            alert("Error connecting to server. Please try again later.");
        },
        "async": true,
        "crossDomain": true,
        "url": "https://young-thicket-94378.herokuapp.com/https://classes.colorado.edu/api/?page=fose&route=details",
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "x-requested-with": "classes.colorado.edu"
        },
        "processData": false,
        "data": `{\"group\":\"code:${code}\"}`
      }).done(response=>{
          if(response.count == 0){
              alert("No results found");
              spinner.css("display","none");
              btnText.css("display","inline-block");
              return
          }
          
          info.find(".modal-body").append(response.description.replaceAll("<a", "<span").replaceAll("</a>", "</span>"));
          info.modal("show");
          spinner.css("display","none");
          btnText.css("display","inline-block");
      });
}
var calendar;
var calendarEl;
//Init calendar
document.addEventListener('DOMContentLoaded', function() {
calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
	headerToolbar : {
        start: '', // will normally be on the left. if RTL, will be on the right
		center: '',
		end: ''
    },
	dayHeaderFormat: {
		weekday: 'short'
	},
    initialView: 'timeGridWeek',
    slotEventOverlap: 'false',
	themeSystem: 'standard',
    minTime: '08:00:00',
    maxTime: '17:00:00',
    eventMaxStack: '1',
	allDaySlot: false,
	contentHeight: "85vh"
  });
  calendar.render();
  $('[class*="fc-day-today"]').css('background-color', 'transparent');
  calendar.addEvent({
	  title: 'test',
	  start: '2022-04-018 09:30',
	  end: '2022-18-4 13:15'
  });
  calendar.render();
  $("[class='fc-scroller fc-scroller-liquid-absolute']").css("overflow-y", "hidden");
});
