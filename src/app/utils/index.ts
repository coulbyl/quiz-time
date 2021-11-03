import { ScoreBoard } from '../scoreboard/scoreboard.model';

export const ranking = (users: ScoreBoard[]) => {
  users.sort((a, b) => b.lastScore - a.lastScore);
  let rank = 1;
  for (var i = 0; i < users.length; i++) {
    if (i > 0 && users[i].lastScore < users[i - 1].lastScore) {
      rank++;
    }
    users[i].rank = rank;
  }
  return users;
};

export const getExpirationDate = (expiresIn: number): Date => {
  return new Date(new Date().getTime() + expiresIn * 1000);
};
