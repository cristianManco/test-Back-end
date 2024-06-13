# async getRandomPrize(): Promise<Prize> {
#     const prizes = await this.prizesRepository.find({ where: { quantity: MoreThan(0) } });
#     if (prizes.length === 0) {
#       throw new NotFoundException('No available prizes');
#     }
#     const randomIndex = Math.floor(Math.random() * prizes.length);
#     return prizes[randomIndex];
#   }

#   async claimPrize(playerId: number): Promise<PlayerPrize> {
#     const player = await this.playersRepository.findOne({ where: { id: playerId }, relations: ['prizes'] });
#     if (!player) {
#       throw new NotFoundException(`Player with ID ${playerId} not found`);
#     }

#     const prize = await this.getRandomPrize();
#     prize.quantity -= 1;

#     const playerPrize = this.playerPrizesRepository.create({
#       player,
#       prize,
#       isClaimed: true,
#     });

#     await this.prizesRepository.save(prize);
#     return this.playerPrizesRepository.save(playerPrize);
#   }

#   async assignUnclaimedPrizes(): Promise<void> {
#     const unclaimedPrizes = await this.playerPrizesRepository.find({ where: { isClaimed: false } });

#     for (const playerPrize of unclaimedPrizes) {
#       playerPrize.isClaimed = true;
#       await this.playerPrizesRepository.save(playerPrize);
#     }
#   }

#   async createPrize(createPrizeDto: CreatePrizeDto): Promise<Prize> {
#     const prize = this.prizesRepository.create(createPrizeDto);
#     return this.prizesRepository.save(prize);
#   }

