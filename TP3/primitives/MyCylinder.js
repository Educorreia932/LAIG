/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x1 - x coordinate corner 1
 * @param y1 - y coordinate corner 1
 * @param x2 - x coordinate corner 2
 * @param y2 - y coordinate corner 2
*/ 
class MyCylinder extends CGFobject {
	constructor(scene, bottomRadius, topRadius, height, slices, stacks) {
        super(scene);
        
		this.bottomRadius = bottomRadius;
		this.topRadius = topRadius;
		this.height = height;
        this.slices = slices;
        this.stacks = stacks;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Auxiliary variables
        let currentIndex = 0;
        let xCoord = 0.0;
        let phi = 0;
        let height = 0;
        let radius = this.bottomRadius;
        const slope = this.height / Math.abs(this.topRadius - this.bottomRadius);

        // Increments
        const phiIncrement = (Math.PI * 2) / this.slices;
        const heightIncrement = this.height / this.stacks;
        const radiusIncrement = (this.topRadius - this.bottomRadius) / this.stacks;

        for (let stack = 0; stack <= this.stacks; stack++) {
            phi = 0;
            xCoord = 0;

            for (let div = 0; div <= this.slices; div++) {
                let cosPhi = Math.cos(phi);
                let sinPhi = Math.sin(phi);
    
                let x = cosPhi * radius;
                let y = sinPhi * radius;
                
                this.vertices.push(x, y, height);
                this.normals.push(cosPhi, sinPhi, -1 / slope);
                this.texCoords.push(xCoord, 1 - height / this.height);
                
                if (stack > 0) {
                    this.indices.push(currentIndex, currentIndex + this.slices + 1, currentIndex + this.slices);
                    this.indices.push(currentIndex, currentIndex + 1, currentIndex + this.slices + 1);

                    currentIndex += 1;
                }
                
                phi += phiIncrement;

                xCoord += 1 / this.slices;
            }

            height += heightIncrement;
            radius += radiusIncrement;    
        }

        phi = 0;

        currentIndex += this.slices;
        
        let bottomCenterIndex = currentIndex + this.slices * 2;
        let topCenterIndex =  currentIndex + this.slices * 2 + 1;

        // Lids
        for (let div = 0; div <= this.slices; div++) {
            let cosPhi = Math.cos(phi);
            let sinPhi = Math.sin(phi);

            let x = cosPhi * this.bottomRadius;
            let y = sinPhi * this.bottomRadius;

            // Bottom lid
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, -1);
            this.texCoords.push(1 - (cosPhi/ 2 + 0.5), 1 - (sinPhi / 2 + 0.5));

            x = cosPhi * this.topRadius;
            y = sinPhi * this.topRadius;

            // Top lid
            this.vertices.push(x, y, this.height);
            this.normals.push(0, 0, 1);
            this.texCoords.push(cosPhi/ 2 + 0.5, 1 - (sinPhi / 2 + 0.5));

            this.indices.push(bottomCenterIndex, currentIndex, currentIndex + 2);
            this.indices.push(currentIndex + 3, currentIndex + 1, topCenterIndex);

            currentIndex += 2;

            phi += phiIncrement;
        }

        this.vertices.push(0, 0, 0); // Bottom center 
        this.texCoords.push(0.5, 0.5);
        this.vertices.push(0, 0, this.height); // Top center
        this.texCoords.push(0.5, 0.5);

        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}   

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
    }
}

