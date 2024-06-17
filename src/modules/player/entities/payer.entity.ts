import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { MatchResult } from '../../Result/entities/resul.entity';
import { PlayerPrize } from 'src/modules/prize/entities/playerPrize.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  stats: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MatchResult, (matchResult) => matchResult.winner)
  matchesWon: MatchResult[];

  @OneToMany(() => MatchResult, (matchResult) => matchResult.loser)
  matchesLost: MatchResult[];

  @OneToMany(() => PlayerPrize, (playerPrize) => playerPrize.player)
  prizes: PlayerPrize[];
}
