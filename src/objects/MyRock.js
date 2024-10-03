import {CGFobject, CGFappearance, CGFtexture} from "../../lib/CGF.js";

/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
	constructor(scene, radius, slices, stacks, inverted = false) {
		super(scene);

        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.inverted = inverted;

        let [r, g, b] = this.randomGreyish();
        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setAmbient(r, g, b, 1.0);
        this.rockMaterial.setDiffuse(r, g, b,  1.0);
        this.rockMaterial.setSpecular(r, g, b,  1.0);
        this.rockMaterial.setShininess(10.0);

        this.texture = new CGFtexture(this.scene, "src/images/rock.png");
        this.rockMaterial.setTextureWrap('REPEAT', 'REPEAT');
		this.initBuffers();
	}
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let i = 0; i <= this.stacks; i++) {
            var phi = (i * Math.PI) / this.stacks;
            for (let j = 0; j <= this.slices; j++) {
                var theta = (j * 2 * Math.PI) / this.slices;

                var x = this.radius * Math.sin(phi) * Math.cos(theta);
                var y = this.radius * Math.cos(phi);
                var z = this.radius * Math.sin(phi) * Math.sin(theta);

                // Calculate normal vector
                var normalX = Math.sin(phi) * Math.cos(theta);
                var normalY = Math.cos(phi);
                var normalZ = Math.sin(phi) * Math.sin(theta);

                // Calculate a random offset within a range proportional to the radius
                var offsetRange = 0.1 * this.radius; // Adjust the factor to control the range
                var offset = Math.random() * offsetRange * (Math.random() < 0.5 ? -1 : 1);

                // Apply the offset
                x += normalX * offset;
                y += normalY * offset;
                z += normalZ * offset;

                this.vertices.push(x, y, z);

                // Generate texture coordinates
                this.texCoords.push(j / this.slices, i / this.stacks);

                // Push normals
                this.normals.push(normalX, normalY, normalZ);
            }
        }

        // Ensure vertices and normals of last slice are the same as the first slice
        for (let i = 0; i <= this.stacks; i++) {
            var startIdx = i * (this.slices + 1);
            var endIdx = (i + 1) * (this.slices + 1) - 1;
            for (let k = 0; k < 3; k++) {
                this.vertices[endIdx * 3 + k] = this.vertices[startIdx * 3 + k];
                this.normals[endIdx * 3 + k] = this.normals[startIdx * 3 + k];
            }
        }

        // Generate indices
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                var vertexIndex = i * (this.slices + 1) + j;
                var nextVertexIndex = vertexIndex + 1;
                var nextStackVertexIndex = (i + 1) * (this.slices + 1) + j;
                var nextStackNextVertexIndex = nextStackVertexIndex + 1;

                // Define triangles for the current and next stack
                this.indices.push(vertexIndex, nextVertexIndex, nextStackVertexIndex);
                this.indices.push(nextStackVertexIndex, nextVertexIndex, nextStackNextVertexIndex);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.rockMaterial.setTexture(this.texture);
        this.rockMaterial.apply();
        this.scene.popMatrix();

        super.display();
    }

    randomize(min, max) {
        return Math.random() * (max - min) + min;
    }

    randomGreyish() {
        const baseValue = this.randomize(0.3, 0.7); // Adjust brightness level as needed
        const variation = this.randomize(0, 0.3); // Adjust variation range as needed
        const r = baseValue + variation;
        const g = baseValue + variation;
        const b = baseValue + variation;
        return [r, g, b];
    }
}