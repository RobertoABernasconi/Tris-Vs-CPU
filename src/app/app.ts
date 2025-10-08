import {Component, OnInit} from '@angular/core';
import {CPUPlayerService} from './services/CPUPlayerService';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  mappaSuoni = new Map<string, HTMLAudioElement>

  ngOnInit() {
    let suonoVittoria = new Audio();
    suonoVittoria.src = "victory.wav";
    suonoVittoria.load();
    let suonoErrore = new Audio();
    suonoErrore.src = "wrong.wav";
    suonoErrore.load();
    let suonoMossaValida = new Audio();
    suonoMossaValida.src = "valid.wav";
    suonoMossaValida.load();
    let suonoSconfitta = new Audio();
    suonoSconfitta.src = "loss.mp3"
    suonoSconfitta.load();
    this.mappaSuoni.set("vittoria", suonoVittoria);
    this.mappaSuoni.set("errore", suonoErrore);
    this.mappaSuoni.set("valida", suonoMossaValida);
    this.mappaSuoni.set("sconfitta", suonoSconfitta);
  }

  cpu: CPUPlayerService = new CPUPlayerService();
  mossaNumero: number = 0;
  giocatore: string = "";
  avversario: string = "";
  giocatoreAttivo: string = "";
  partitaInCorso: boolean = false;
  turnoGiocatore: boolean = true;
  pausaPensiero: boolean = false;
  messaggioFinale: string = "";
  valori: string[][] =
    [
      ["", "", ""],//riga 0
      ["", "", ""],//riga 1
      ["", "", ""],//riga 2
    ];

  avvia() {
    this.messaggioFinale = "";
    this.mossaNumero = 0;
    if (Math.random() < 0.5) { //50 e 50
      this.giocatore = "X";
      this.avversario = "O";
    } else {
      this.giocatore = "O";
      this.avversario = "X"
    }
    this.cpu.updatePlayers(this.giocatore, this.avversario)

    this.valori = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]
    this.partitaInCorso = true;

    if (Math.random() < 0.5) {
      this.giocatoreAttivo = this.avversario;
      this.turnoCPU();
    } else {
      this.giocatoreAttivo = this.giocatore;
    }
  }

  turnoCPU() {
    if (this.turnoGiocatore) {
      this.giocatoreAttivo = this.avversario;
      this.turnoGiocatore = false;
      this.pausaPensiero = true;
      setTimeout(() => {
          let mossaCPU = this.calcolaMossaCPU();
          this.valori[mossaCPU.row][mossaCPU.col] = this.avversario;
          this.mossaNumero++;
          this.pausaPensiero = false;

          this.controllaFinePartita(mossaCPU.row, mossaCPU.col)
        }, 500
      )
      setTimeout(() => {
        this.turnoGiocatore = true;
        this.giocatoreAttivo = this.giocatore;
      }, 1000)
    }
  }

  //funzione che utilizza il service
  calcolaMossaCPU() {
    return this.cpu.findBestMove(this.valori);
  }

  inserisciValore(riga: number, colonna: number) {
    if (this.turnoGiocatore) {
      if (this.valori[riga][colonna]) {
        this.mappaSuoni.get("errore")!.play(); //il ! dà la garanzia che la chiave corrisponda a un valore, quindi la mappa restituirà un oggetto del tipo corretto
      } else {
        this.mossaNumero++;
        this.valori[riga][colonna] = this.giocatore
        this.controllaFinePartita(riga, colonna);
        this.giocatoreAttivo = this.avversario;
        this.turnoCPU()
      }
    }
  }

  controllaFinePartita(riga: number, colonna: number) {
    let vittoria = this.controllaVittoria(riga, colonna);
    let pareggio = this.controllaPareggio();

    if (vittoria) {
      if (this.giocatore == this.valori[riga][colonna]) {
        this.mappaSuoni.get("vittoria")!.play(); //il ! dà la garanzia che la chiave corrisponda a un valore, quindi la mappa restituirà un oggetto del tipo corretto
        this.messaggioFinale = "HAI VINTO";
      } else {
        this.mappaSuoni.get("sconfitta")!.play(); //il ! dà la garanzia che la chiave corrisponda a un valore, quindi la mappa restituirà un oggetto del tipo corretto
        this.messaggioFinale = "HAI PERSO";
      }

      this.partitaInCorso = false;

    } else if (pareggio) {
      this.partitaInCorso = false;
      this.messaggioFinale = "PAREGGIO";
    } else this.mappaSuoni.get("valida")!.play();//il ! dà la garanzia che la chiave corrisponda a un valore, quindi la mappa restituirà un oggetto del tipo corretto
  }

  //deve restituire true se giocatore attuale ha vinto
  controllaVittoria(riga: number, colonna: number): boolean {
    //check colonna
    for (let i = 0; i < 3; i++) {
      if (this.valori[i][colonna] !== this.giocatoreAttivo) break;
      if (i == 2) return true; //se arrivo qui, vuol dire che la colonna è tutta uguale al simbolo del giocatore attivo. Idem per i casi successivi
    }

    //check riga
    for (let i = 0; i < 3; i++) {
      if (this.valori[riga][i] !== this.giocatoreAttivo) break;
      if (i == 2) return true;
    }

    //check diagonale
    if (riga == colonna) {
      for (let i = 0; i < 3; i++) {
        if (this.valori[i][i] !== this.giocatoreAttivo) break;
        if (i == 2) return true;
      }
    }

    //check seconda diagonale
    if ((riga + colonna) == 2) {
      for (let i = 0; i < 3; i++) {
        if (this.valori[2 - i][i] !== this.giocatoreAttivo) break;
        if (i == 2) return true;

      }
    }
    return false
  }

  controllaPareggio(): boolean {
    return this.mossaNumero == 9;
  }
}
