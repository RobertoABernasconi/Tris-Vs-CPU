import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App
{
  //consegne aggiuntive facoltative
  //1) Grafica bella, no alert, fate comparire e scomparire messaggi come parti della pagina
  //2) Trovare il modo per far udire 3 suoni
  //    consiglio, cercate online "sound effect on click angular"
  //    TOC quando mossa fatta
  //    BUU quando mossa sbagliata
  //    SUONO FESTOSO quando vittoria
  //3) Trovare Online un qualche algoritmo e provare a implementarlo qui dentro
  //    per fare in modo che il turno di X sia SEMPRE GESTITO dal programma



  giocatore:string="";
  partitaInCorso:boolean = false;

  valori:string[][] =
    [
      ["","",""],//riga 0
      ["","",""],//riga 1
      ["","",""],//riga 2
    ];

  //deve impostare il giocatore come X o O casualmente
  //per la casualità fare generare un numero tra 0 e 1, se <0.5 è X, altrimenti O
  //deve impostare partita in corso a true
  //deve ripulire valori
  avvia() {

  }

  //fate cambiare giocatore
  cambiaTurno()
  {

  }


  inserisciValore(riga: number, colonna: number)
  {
    //1 controllare che il valore sia vuoto, se non lo è ""stampare"" che non è mossa valida
    //e terminare il metodo (return vuoto)

    //2 modificare il valore corrispondente con il segno del giocatore attuale

    //3 controllare fine partita (vittoria giocatore attuale o patta)
    let vittoria = this.controllaVittoria();

    let pareggio = this.controllaPareggio();
    //4 se non è finita, cambiare turno
  }

  //deve restituire true se giocatore attuale ha vinto
  controllaVittoria():boolean
  {
    return false;
  }

  //deve restituire true nessuno ha vinto, caselle finite
  controllaPareggio():boolean
  {
    return false;
  }




}
