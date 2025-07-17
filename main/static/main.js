var timerSettingsElement = document.getElementById('timer-settings');
var timeSettings = {
    "Focus": { min: parseInt(timerSettingsElement.getAttribute('data-focus-time')), sec: parseInt(timerSettingsElement.getAttribute('data-focus-time-sec')) },
    "Short break": { min: parseInt(timerSettingsElement.getAttribute('data-short-break')), sec: parseInt(timerSettingsElement.getAttribute('data-short-break-sec')) },
    "Long break": { min: parseInt(timerSettingsElement.getAttribute('data-long-break')), sec: parseInt(timerSettingsElement.getAttribute('data-long-break-sec')) }
}; //pobranie czasów wpisanych użytkownika

var pattern = ["Focus", "Short break", "Focus", "Short break", "Focus", "Short break", "Focus", "Long break"]; //pattern pomodoro
var intervalId;
var currentPhase = 0; // przechowuje aktualną fazę w pattern

function startTimer() {
    var phase = pattern[currentPhase]; // Pobierz aktualną fazę (np. Focus, Short break)
    var cmin = timeSettings[phase].min; // Pobierz minuty dla aktualnej fazy
    var csec = timeSettings[phase].sec; // Pobierz sekundy dla aktualnej fazy

    // Funkcja licznika czasu
    function count() {
        document.querySelector("#stop").disabled = false; //odblokowanie stopu

        if (cmin === 0 && csec === 0) { //jeśli doliczył do zera
            clearInterval(intervalId); // Zatrzymaj odliczanie
            var sound = document.getElementById("alarmSound"); //dzwiek alarmu
            sound.play();

            currentPhase++; // Przejdź do kolejnej fazy
            if (currentPhase < pattern.length) {
                startTimer(); // Uruchom nowy timer dla kolejnej fazy
            } else {
                document.querySelector("#start").disabled = false; //wlaczenie staru
                return; // Zakończ, jeśli nie ma więcej faz
            }
            return;
        }

        csec--;

        if (csec < 0) {
            cmin--;
            csec = 59;
        }

        // Aktualizacja wyświetlania czasu
        document.getElementById("timer").innerHTML = cmin + ':' + (csec < 10 ? "0" + csec : csec);
    }

    // Uruchom odliczanie
    intervalId = setInterval(count, 1000);

    // Ustaw aktualną fazę
    document.getElementById("currentphase").innerHTML = phase; //wyswietlanie trwajacej fazy pomodoro
}

// Funkcja stopowania timera
function stop() {
    clearInterval(intervalId);
    intervalId = null;
    document.querySelector("#start").disabled = false; //odblokowanie start 
    document.querySelector("#stop").disabled = true; //zablokowanie stop
    document.querySelector("#reset").disabled = false; //odblokowanie resetu
}

// Funkcja resetowania timera
function reset() {
    clearInterval(intervalId);
    intervalId = null;
    //currentPhase = 0; // Zresetuj do pierwszej fazy
    var phase = pattern[currentPhase]; // Pobierz fazę początkową (Focus)
    var cmin = timeSettings[phase].min;
    var csec = timeSettings[phase].sec;
    document.getElementById("timer").innerHTML = cmin + ':' + (csec < 10 ? "0" + csec : csec);
    document.querySelector("#start").disabled = false; //właczenie start
    document.querySelector("#stop").disabled = true;//wylaczenie stop
    document.getElementById("currentphase").innerHTML = phase; // Zaktualizuj fazę na interfejsie
}

function right(){
    clearInterval(intervalId);
    intervalId = null;
    currentPhase = currentPhase + 1; 
    if( currentPhase == 8)
    {
        currentPhase = 0;
    }

    var phase = pattern[currentPhase]; // Pobierz fazę początkową (Focus)
    var cmin = timeSettings[phase].min;
    var csec = timeSettings[phase].sec;
    document.getElementById("timer").innerHTML = cmin + ':' + (csec < 10 ? "0" + csec : csec);
    document.querySelector("#start").disabled = false; //właczenie start
    document.querySelector("#stop").disabled = true;//wylaczenie stop
    document.getElementById("currentphase").innerHTML = phase; // Zaktualizuj fazę na interfejsie
}

function left(){
    clearInterval(intervalId);
    intervalId = null;
    currentPhase = currentPhase - 1; 
    if( currentPhase == -1)
    {
        currentPhase = 8;
    }

    var phase = pattern[currentPhase]; // Pobierz fazę początkową (Focus)
    var cmin = timeSettings[phase].min;
    var csec = timeSettings[phase].sec;
    document.getElementById("timer").innerHTML = cmin + ':' + (csec < 10 ? "0" + csec : csec);
    document.querySelector("#start").disabled = false; //właczenie start
    document.querySelector("#stop").disabled = true;//wylaczenie stop
    document.getElementById("currentphase").innerHTML = phase; // Zaktualizuj fazę na interfejsie
}

//po zaladowaniu strony
document.addEventListener('DOMContentLoaded', function() {
    var phase = pattern[currentPhase]; // Pobierz aktualną fazę (np. Focus, Short break)
    var cmin = timeSettings[phase].min;
    var csec = timeSettings[phase].sec;

    // Wyłącz przycisk stop na początku
    document.querySelector("#stop").disabled = true;

    // Wyświetl początkowy czas
    document.getElementById("timer").innerHTML = cmin + ':' + (csec < 10 ? "0" + csec : csec);
    document.getElementById("currentphase").innerHTML = phase; // Wyświetl aktualną fazę

    // Obsługa przycisku start
    document.querySelector("#start").onclick = function() {
        if (!intervalId) {
            startTimer(); // Uruchomienie timera
            document.querySelector("#start").disabled = true; // Wyłącz przycisk start po uruchomieniu
        }
    };

    // Obsługa przycisku stop
    document.querySelector("#stop").onclick = stop;

    // Obsługa przycisku reset
    document.querySelector("#reset").onclick = reset;

    //obsluga next
    document.querySelector("#right").onclick = right;

    //obsluga left
    document.querySelector("#left").onclick = left;
});
