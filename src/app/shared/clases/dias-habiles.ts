export  function DiasHabiles(fecha_1 : Date , fecha_2 :Date) {
    var days2 = (fecha_2.getTime() - Date.UTC(fecha_2.getFullYear(),0,0) ) / 1000 / 60 / 60 / 24;
    const days1 = (fecha_1.getTime() - Date.UTC(fecha_1.getFullYear(),0,0) ) / 1000 / 60 / 60 / 24;
    if (fecha_2.getFullYear()!=fecha_1.getFullYear()) {
        days2 = 365 + days2
    }
    var daysdifference = Math.floor(days2 - days1)
    
    var weeks = Math.floor(daysdifference / 7)

    var workdays = weeks * 5

    return workdays
    


}
