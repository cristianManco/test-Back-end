import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Player } from '../../player/entities/payer.entity';
import { Prize } from './prize.entity';

@Entity()
export class PlayerPrize {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.prizes)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Prize, (prize) => prize.playerPrizes)
  @JoinColumn({ name: 'prize_id' })
  prize: Prize;

  @Column({ default: false })
  isClaimed: boolean;

  @CreateDateColumn()
  assignedAt: Date;
}
