import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
    init(){
        this._super(...arguments);
        this.frameCycle = 1;
        this.framesPerMovement = 30;  

        this.directions = {
            'up': {x: 0, y: -1},
            'down': {x: 0, y: 1},
            'left': {x: -1, y: 0},
            'right': {x: 1, y: 0},
            'stopped': {x: 0, y: 0},
        };
    },
    
    ctx: computed(function(){
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        return ctx;
    }),

    drawCircle(x, y ,radiusDivisor, direction) {
        let ctx = this.get('ctx');
        let squareSize = this.get('level.squareSize');

        let pixelX = (x + 1/2 + this.offsetFor('x', direction)) * squareSize;
        let pixelY = (y + 1/2 + this.offsetFor('y', direction)) * squareSize;

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(pixelX, pixelY, squareSize / radiusDivisor, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    },

    offsetFor(coordinate, direction){
        let frameRatio = this.get('frameCycle') / this.get('framesPerMovement');
        return this.get(`directions.${direction}.${coordinate}`) * frameRatio;
    }
}); 