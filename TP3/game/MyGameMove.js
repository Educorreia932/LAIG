class MyGameMove {
    constructor(player, moveCoordinates, stackSize) {
        this.player = player;

        this.originI = moveCoordinates[0];
        this.originJ = moveCoordinates[1];
        this.destinationI = moveCoordinates[2];
        this.destinationJ = moveCoordinates[3];

        this.stackSize = stackSize;
    };

    /**
     *  Swap origin and destination coordinates
     *  Effectively undoing the move
     */
    swap() {
        [this.originI, this.destinationI] = [this.destinationI, this.originI];
        [this.originJ, this.destinationJ] = [this.destinationJ, this.originJ];

        return this;
    }
}