export  function DiasHabiles(startDate : Date, endDate : Date){
    var result = 0;

   var currentDate = startDate;
   while (currentDate <= endDate)  {  

       var weekDay = currentDate.getDay();
       if(weekDay != 7 && weekDay != 6)
           result++;

        currentDate.setDate(currentDate.getDate()+1); 
   }

   return result;
}
