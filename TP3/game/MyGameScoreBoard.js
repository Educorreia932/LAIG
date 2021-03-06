class MyGameScoreBoard extends CGFobject {
    constructor(orchestrator) {
        super(orchestrator.scene);
        this.orchestrator = orchestrator;
        this.scene = orchestrator.scene;

        this.whiteScore = new MySpriteText(this.scene, "White: 0");
        this.blackScore = new MySpriteText(this.scene, "Black: 0");
        this.timeElapsed = new MySpriteText(this.scene, "Time elapsed: 0 seconds");
        this.nowPlaying = new MySpriteText(this.scene, "Black is now playing");

        this.matrix = mat4.create();
    }

    display() {
        this.scene.pushMatrix();

        this.scene.multMatrix(this.matrix);

        // White score

        this.scene.pushMatrix();

        this.scene.translate(1, 0, 0);
        this.whiteScore.display();

        this.scene.popMatrix();

        // Black score

        this.scene.pushMatrix();

        this.scene.translate(-4.5, 0, 0);
        this.blackScore.display();

        this.scene.popMatrix();

        // Time elapsed

        this.scene.pushMatrix();

        this.scene.translate(-this.timeElapsed.getLength() / 4, -3, 0);
        this.timeElapsed.display();

        this.scene.popMatrix();

        // Now playing

        this.scene.pushMatrix();

        this.scene.translate(-this.nowPlaying.getLength() / 4, -4, 0);
        this.nowPlaying.display();

        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    update() {
        this.whiteScore.setText("White: " + this.orchestrator.scores["w"]);
        this.blackScore.setText("Black: " + this.orchestrator.scores["b"]);

        let turn = {
            "w": "White",
            "b": "Black"
        }

        if (this.orchestrator.gameEnded())
            this.nowPlaying.setText("Game finished");

        else {
            this.timeElapsed.setText("Time remaining: " + (this.orchestrator.timeout - this.orchestrator.elapsedTime) + " seconds");
            this.nowPlaying.setText(turn[this.orchestrator.nowPlaying] + " is now playing");
        }
    }

    setTheme() {
        this.matrix = this.orchestrator.theme.scoreboard.transformation;
    }
}