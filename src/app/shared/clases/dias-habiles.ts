export  function DiasHabiles(startDate : Date, endDate : Date){
    var result = 0;
    console.log(startDate.getDay() + 'Start date');
   var currentDate = startDate;
   while (currentDate <= endDate)  {  

       var weekDay = currentDate.getDay();
       if(weekDay == 5 || weekDay == 6)
       {
        currentDate.setDate(currentDate.getDate()+1);
        continue
       } else {
        currentDate.setDate(currentDate.getDate()+1);
        result+=1;
       }

         
   }
   console.log(result);
   return result;
}
