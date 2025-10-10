import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//adapted from: https://www.geeksforgeeks.org/dsa/finding-optimal-move-in-tic-tac-toe-using-minimax-algorithm-in-game-theory/
export class CPUPlayerService {

  opponent = '';
  cpu = '';

  updatePlayers(player: string, cpu: string) {
    this.cpu = cpu;
    this.opponent = player;
  }

  private isMovesLeft(board: string[][]): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') return true;
      }
    }
    return false;
  }

  private evaluate(b: string[][]): number {
    // Rows
    for (let row = 0; row < 3; row++) {
      if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
        if (b[row][0] === this.cpu) return +10;
        else if (b[row][0] === this.opponent) return -10;
      }
    }

    // Columns
    for (let col = 0; col < 3; col++) {
      if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
        if (b[0][col] === this.cpu) return +10;
        else if (b[0][col] === this.opponent) return -10;
      }
    }

    // Diagonals
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      if (b[0][0] === this.cpu) return +10;
      else if (b[0][0] === this.opponent) return -10;
    }

    if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      if (b[0][2] === this.cpu) return +10;
      else if (b[0][2] === this.opponent) return -10;
    }

    return 0;
  }

  private minimax(board: string[][], depth: number, isMax: boolean): number {
    const score = this.evaluate(board);

    if (score === 10) return score;
    if (score === -10) return score;
    if (!this.isMovesLeft(board)) return 0;

    if (isMax) {
      let best = -1000;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = this.cpu;
            best = Math.max(best, this.minimax(board, depth + 1, false));
            board[i][j] = '';
          }
        }
      }
      return best;
    } else {
      let best = 1000;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = this.opponent;
            best = Math.min(best, this.minimax(board, depth + 1, true));
            board[i][j] = '';
          }
        }
      }
      return best;
    }
  }

  findBestMove(board: string[][]): { row: number; col: number } {
    let bestVal = -1000;
    let bestMove = {row: -1, col: -1};

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = this.cpu;
          const moveVal = this.minimax(board, 0, false);
          board[i][j] = '';

          if (moveVal > bestVal) {
            bestMove = {row: i, col: j};
            bestVal = moveVal;
          }
        }
      }
    }
    return bestMove;
  }
}
