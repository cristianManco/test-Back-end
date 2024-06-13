import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PlayerPrize } from './playerPrize.entity';

@Entity()
export class Prize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @OneToMany(() => PlayerPrize, (playerPrize) => playerPrize.prize)
  playerPrizes: PlayerPrize[];
}
