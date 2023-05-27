import { Regioni } from  './regioni.js';

/***  Popunjavanje pocetnih vrednosti Output polja ***/
/***                                               ***/
var JMBG = "";
var dateOfBirth = "";
var age = "";
var region = "";
var pol = "";
var checkSum = "";
document.getElementById("jmbg").value = JMBG;
document.getElementById("dob").value = dateOfBirth;
document.getElementById("age").value = age;
document.getElementById("region").value = region;
document.getElementById("gender").value = pol;
document.getElementById("checksum").value = checkSum;

function handleSubmit() {
  /*** JMBG ***/
  /***      ***/
  JMBG = userInput;
  /*** DATUM RODJENJA ***/
  /***                ***/
  var dayOfBirth = JMBG.substring(0, 2);
  var monthOfBirth = JMBG.substring(2, 4);
  var threeDigitsYearOfBirth = JMBG.substring(4, 7);
  var yearOfBirth = 0;
  var isDateValid = true;
  // provera da li je osoba rodjena u 20. veku
  if (threeDigitsYearOfBirth.charAt(0)  === "9") {
    yearOfBirth = "1" + threeDigitsYearOfBirth;
  // onda je rodjena u 21. veku
  } else if(threeDigitsYearOfBirth.charAt(0)  === "0"){
    yearOfBirth = "2" + threeDigitsYearOfBirth;
  }
  // provera da li datum postoji u kalendaru
  var date = new Date(yearOfBirth, monthOfBirth-1, dayOfBirth);
  isDateValid = date.getDate() == dayOfBirth && date.getMonth() == monthOfBirth-1 && date.getFullYear() == yearOfBirth;
  // ukoliko postoji u kalendaru izracunavamo godine
  var isAgeValid = true;
  if (isDateValid){
    dateOfBirth = dayOfBirth + " " + monthOfBirth + " " + yearOfBirth;
    var currentDate = new Date(); 
    var currentDay = currentDate.getDate(); // danasnji dan
    var currentMonth = currentDate.getMonth() + 1; // danasnji mesec (0-indexed)
    var currentYear = currentDate.getFullYear(); // danasnja godina
    age = currentYear - yearOfBirth;
    // Provera da li su trenutni mesec i dan pre meseca i dana rodjenja ukoliko je osoba rodjena ove godine
    if (currentMonth < monthOfBirth || (currentMonth == monthOfBirth && currentDay < dayOfBirth)) {
      age--; // Postavljamo godine na -1 ukoliko se datum rodjenja jos nije dogodio
    };
    // Provera da li je osoba rodjena u buducnosti
    if (age<0) isAgeValid = false;
  }
   // ukoliko datum nije validan ili je osoba rodjena u buducnosti
  if(!isAgeValid || !isDateValid){
    dateOfBirth = "Datum rodjenja nije validan";
    age = "Datum rodjenja nije validan";
  }

  /***  Region ***/
  /***         ***/
  var podrucijeKod = JMBG.substring(7, 9);
  var matchingObject = Regioni.find(function(obj) {
    return obj.podrucije === podrucijeKod.toString();
  });
  if (matchingObject) {
    region = matchingObject.mesta;
  } else {
    region = "Osoba nije drzavljanin Republike Srbije"
  }

  /***   Pol  ***/
  /***        ***/
  var polKod = JMBG.substring(9, 12);
  if(polKod <500) { pol = "Muški"}
  else { pol = "Ženski"}

  /***   Kontrolna Cifra  ***/
  /***                    ***/
  var checkSumKod = JMBG.substring(12);
  var a = parseInt(JMBG.charAt(0));
  var b = parseInt(JMBG.charAt(1));
  var c = parseInt(JMBG.charAt(2));
  var d = parseInt(JMBG.charAt(3));
  var e = parseInt(JMBG.charAt(4));
  var f = parseInt(JMBG.charAt(5));
  var g = parseInt(JMBG.charAt(6));
  var h = parseInt(JMBG.charAt(7));
  var i = parseInt(JMBG.charAt(8));
  var j = parseInt(JMBG.charAt(9));
  var k = parseInt(JMBG.charAt(10));
  var l = parseInt(JMBG.charAt(11));
  var realCheckSum = 11 - ((7*( a + g) + 6*(b + h) + 5*(c + i) + 4*(d + j) + 3*(e + k) + 2*(f + l)) % 11);

  if(checkSumKod != realCheckSum){
    checkSum = "Kontrolni broj JMBG-a je neispravan"
    document.getElementById('checksum').style.color = 'red';
  }
  else{
    checkSum = "Kontrolni broj JMBG-a je ispravan"
    document.getElementById('checksum').style.color = 'green';
  }

  /***  PRIKAZ ***/
  /***         ***/
  document.getElementById("jmbg").value = JMBG;
  document.getElementById("dob").value = dateOfBirth;
  document.getElementById("age").value = age;
  document.getElementById("region").value = region;
  document.getElementById("gender").value = pol;
  
  document.getElementById("checksum").value = checkSum;

  // Resetovanje polja i stilova nakon unosa JMBG-a
  var inputElement = document.getElementById('numberInput');
  inputElement.value = "";
  userInput = "";
  var submitButton = document.getElementById('submitButton');
  submitButton.classList.add('hidden');
  document.getElementById('warning13').style.display = 'none';
}

/***   Ogranicenje da prihvata obradu samo ukoliko su uneta sva 13 broja i omogucavanje da se koristni ENTER za submit  ***/

var inputElement = document.getElementById('numberInput');
inputElement.addEventListener('keyup', function(event) {
  if (event.key === 'Enter' && userInput.length === 13) {
    handleSubmit();
  }
  else {
      // kaze da nisi uneo svih 13 cifara
      if (event.key === 'Enter')
      document.getElementById('warning13').style.display = 'block';
  }
});

