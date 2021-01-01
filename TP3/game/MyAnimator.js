class MyAnimator {
    constructor(orchestractor) {
        this.orchestractor = orchestractor;
        this.scene = this.orchestractor.scene;
        this.gameboard = this.orchestractor.gameboard;
        this.animations = [];
    }

    start() {
        
    }

    reset() {

    }

    update(time) {
        for (let animation of this.animations)
            animation.update(time);
    }

    display() {
        for (let animation of this.animations) {
            this.scene.pushMatrix();

            animation.apply();

            this.scene.popMatrix();
        }
    }

    addMoveAnimation(move) {
        let gameboard = this.orchestractor.gameboard;


        gameboard.getStack(move.originI, move.originJ).pieces.length;

        // keyframe

        // let translation = keyframes[this.actualKF]["instant"];
        // let translation = keyframes[this.actualKF]["translation"];
        // let rotation = keyframes[this.actualKF]["rotation"];
        // let scale = keyframes[this.actualKF]["scale"];

        // move.originI 
        // move.originJ
        // move.destinationI
        // move.destinationJ

        let keyframe0 = {
            instant: 0,
            translation: [4, 4, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1]
        }

        let keyframes = [
            keyframe0
        ];

        let moveAnimation = new MyKeyframeAnimation(this.orchestractor.scene, keyframes);

        this.animations.push(moveAnimation);
    }
}