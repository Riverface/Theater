var newdb = new DataBase([],[],[]);
var testTicket;
var newticket;
//Account(tickets,rate)
var user = new Account([],[]);
//types  (name,price(float limited to a precision of two))
var senior = new TypeOfTicket("senior",6.34,0);
var child = new TypeOfTicket("child",10.20,1);
var matinee = new TypeOfTicket("matinee",21.14,2);

var possTimes = ["10:00 AM", "11:00 AM", "11:00 AM","1:00 PM","2:00 PM","4:30 PM","6:00 PM","6:30 PM","8:00 PM", "9:00 PM"];
var possRatings = ["G", "PG", "PG-13","R-18","X"];
var newmovie = new Movie("Smurfs 5:Genocide",[possTimes[0],possTimes[4]],"MA",5);
var thtr = new Theater("The River Theater",21,[],[senior,child,matinee],0,0,0,0,0);
var thtr2 = new Theater("The River Theater",21,[],[senior,child,matinee],0,0,0,0,0);

//function Theater(name, seats,movies,types,cMID,nMID,id,nTID,cTID){
$(document).ready(function() {
  //movies (name,showings,rating,score,room)
  //theaters (seats(int), movies(array), types(array))
  //databases DataBase(accts, movies, theaters,currid,newid)
  //users
  // console.log(thtr);
  //(movie,showing,room,type)
  //testTicket = new Ticket(newmovie,"asdfasdf",1,thtr.types[0]);
  // console.log(testTicket);
  //AddTheaterToDatabase(theater, database)
  //AddMovieToTheater(movie, theater, db)
  //DoBuy(movie,account,tick)
  //(movie, showing, room, type,acct)
  //  AddAccountToDatabase(acct,db)
  // console.log(newmovie);
  // console.log(testTicket);
  // console.log(1);
  // console.log(thtr.types[0]);
  // console.log(user);
  //function BuyTicket(movie, showing, room, type,acct){
  //thtr.types[new TypeOfTicket("senior",6.34),new TypeOfTicket("child",10.20),new TypeOfTicket("matinee",21.14)];

  AddAccountToDatabase(user,newdb);
  AddMovieToDatabase(newmovie,newdb);
  //AddMovieToTheater(newdb.movies[0],thtr,newdb);
  BuyTicket(newmovie,possTimes[1],1, thtr.types[0],user);
  AddTheaterToDatabase(thtr, newdb);
    AddTheaterToDatabase(thtr2, newdb);
  RefreshAcct(user);
  RefreshDataBase(newdb);
  RefreshTheater(newdb.theaters[0]);
  ShowPossTimes(possTimes);
  ShowRatings(possRatings);
  // console.log(newdb);f
  $("#MovDataForm").submit(function(event){
    //(name,showings,rating,score,room)
    event.preventDefault();
    newmovie = new Movie($("#movname").val(),$("#possTimes").val(),$("#rating").val(),0);
    AddMovieToDatabase(newmovie,newdb);
    RefreshDataBase(newdb);
    RefreshTheater(thtr);
  });
  $("#addmovietheater").submit(function(event){
    //(name,showings,rating,score,room)
    event.preventDefault();
    count = 0;
    $("#dbmovies").val().forEach(function(movieNum){
      count++;
      console.log(movieNum);
      //console.log($("#dbmovies").val() + "asdglhadg");
      //console.log(newdb.theaters[$("#selectatheater").val()] + "Theater");
      console.log(newdb.movies[movieNum]);
      console.log(newdb.theaters[$("#selectatheater").val()]);
      var moviegoingintotheater = newdb.movies[movieNum];
      AddMovieToTheater(moviegoingintotheater, newdb.theaters[$("#selectatheater").val()], newdb);
    });
    RefreshDataBase(newdb);
    RefreshTheater(thtr);
  });
});
function RefreshDataBase(db){
  printer = "";
  $("#dbmovies").html("");
  db.movies.forEach(function(mov){
    //console.log("looped");
    printer += "<option value = '";
    //console.log(printer);
    printer += mov.id +"'>";
    //console.log(printer);
    printer += mov.name + "</option>";
    //console.log(printer);

  });
  $("#dbmovies").append(printer);
  printer = "";
  $("#selectatheater").html("");
  db.theaters.forEach(function(dbtheater){
    printer += "<option value = '";
    //console.log(printer);
    printer += dbtheater.id +"'>";
    //console.log(printer);
    printer += dbtheater.name + "</option>";
  });
  $("#selectatheater").append(printer);
}
function ShowPossTimes(times){
  printer = "";
  times.forEach(function(pTime){
    printer += "<option value ='"+ pTime +"'>"
    printer += pTime;
    printer += "</option>";
    //  console.log(printer);
  });
  $("#possTimes").append(printer);
}

function Theater(name, seats,movies,types,cMID,nMID,id,nTID,cTID){
  this.name = name;
  this.seats = seats;
  this.movies = movies;
  this.types = types;
  this.cMID = cMID;
  this.nMID = nMID;
  this.id = 0;
  this.cTID = cTID;
  this.nTID = nTID;
}
function AddTheaterToDatabase(theater, database){
  theater.id = database.nTID;
  database.theaters.push(theater);
  database.nTID++;

}

function AddMovieToDatabase(movie,db){
  movie.id = db.nMID;
  db.movies.push(movie);
  db.nMID++;
}
function AddMovieToTheater(movie, theater, db){
  console.log(movie.id);
  movie.id = theater.nMID;
  theater.movies.push(movie);
  theater.nMID++;
}

function AddAccountToDatabase(acct,db){
  acct.id = db.cAID;
  db.accts.push(acct);
  db.nAID++;
}
function Movie(name,showings,rating,score,room,id){
  this.name = name;
  this.showings = showings;
  this.rating = rating;
  this.score = score;
  this.room = room;
  this.id = id;
}

function TypeOfTicket(name,price,id){
  this.name = name;
  this.price = price;
  this.id = id;
}



function Account(tickets,rate){
  this.tickets = tickets;
  this.ratings = rate;
}

function Ticket(movie,showing,room,type){
  this.type = type;
  this.movie = movie;
  this.showing = showing;
  this.room = room;
}

function BuyTicket(movie, showing, room, type,acct){
  // console.log("---------------------");
  // console.log(movie);
  // console.log(showing);
  // console.log(room);
  // console.log(type);
  // console.log(acct);
  newticket = new Ticket(movie,showing,room,type);
  //console.log(newticket);
  //console.log(acct.tickets);
  acct.tickets.push(newticket);
  //console.log(acct.tickets);
}

function DataBase(accts, movies, theaters){
  this.accts = accts;

  this.theaters = theaters;

  this.movies = movies;
  //Movie IDs
  this.cMID = 0;
  this.nMID = 0;
  //Theater IDs
  this.cTID = 0;
  this.nTID = 0;
  //account IDs
  this.cAID = 0;
  this.nAID = 0;

}

function RefreshAcct(acct){
  $("#acctickets").html("");
  //function Ticket(movie,showing,room,type){
  printer = "";
  acct.tickets.forEach(function(tick){
    printer += "<br><div class='property'>";
    //console.log(tick);

    printer += "<br><div class=''>";
    printer += tick.movie.name;

    printer += "</div>";
    printer += "<br><div class=''>";
    printer += tick.showing;

    printer += "</div>";
    printer += tick.room;

    printer += "<br><div class=''>";
    //console.log(tick.type);
    printer += tick.type.name;
    printer+="<br>$" +tick.type.price;
    printer += "</div>";
    printer += "</div>";
  });
  // console.log(printer);
  $("#acctickets").append(printer);
}
function RefreshTheater(theater){
  //function Movie(name,showings,rating,score,room)
  $("#thtrmovies").html("");
  printer = "";
  count = 0;
  theater.movies.forEach(function(mov){
    printer = "<form class='property' id='ticket"+ mov.id + "'>";
    printer += mov.name + "<br>";
    printer += "Rated " + mov.rating + "<br>";
    printer += mov.score + " out of 10<br>";
    printer += "<select id='time" + mov.id + "'>";
    mov.showings.forEach(function(show){
      printer +="<option value='" + show +"'>"+ show + "<br></option>";
    });
    count++;
    printer+="</select>";

    printer+="<select id='type"+ mov.id + "'>"
    theater.types.forEach(function(type){
    printer+="<option value='" + type.id + "'>" + type.name + "</option>";
  });
    printer += "<br>";
    printer +="</select>";
    printer +="<button type = 'submit' class='btn' value = 'Add To Cart" +"'>Buy</input>";
    printer += "</form>";

    $("#thtrmovies").append(printer);
    addsubmitbutton(mov,theater);
  });

}

function addsubmitbutton(moov,theater){
  //console.log(moov.id);
  //console.log("time" + moov.id);
//console.log($("#type" + moov.id).val());
  $("#ticket" + moov.id).submit(function(event){
    event.preventDefault();
    //console.log($("#type"+moov.id));
    BuyTicket(moov,$("#time" + moov.id).val(),1,theater.types[$("#type"+moov.id).val()],user);

    //BuyTicket(newmovie,possTimes[1],1, thtr.types[0],user);
    RefreshAcct(user);
  });
}

function ShowRatings(rating){
  printer = "";
  rating.forEach(function(rate){
    printer += "<option value='" + rate + "'>";
    printer+= rate;
  })
  $("#rating").append(printer);
}
//AddMovieToTheater(movie, theater, db)
//AddTheaterToDatabase(theater, database)
