attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying vec2 vTextureCoord;

uniform float timeFactor;

void main() {

    vTextureCoord = aTextureCoord;
    vec3 offset = vec3(cos(timeFactor*0.3) * aVertexPosition.y * aVertexPosition.y * 0.2, 0.0, 0.0);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
