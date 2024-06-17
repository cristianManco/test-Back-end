import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Player } from '../../player/entities/payer.entity';
import { Tournament } from '../../Tournament/entities/tournament.entity';

@Entity()
export class MatchResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.matchResults)
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.matchesWon)
  winner: Player;

  @ManyToOne(() => Player, (player) => player.matchesLost)
  loser: Player;

  @Column()
  winnerScore: number;

  @Column()
  loserScore: number;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
