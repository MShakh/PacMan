import Mixin from '@ember/object/mixin';
import { isEmpty } from '@ember/utils';

export default Mixin.create({
    init(){
        this._super(...arguments);
        
        this.x = this.get('x');
        this.y = this.get('y');
        this.level = this.get('level');

        this.direction = 'down';
    },
    
    move(){
        if(this.animationCompleted()){
            this.finalizeMove();
            this.changeDirection();
        } else if(this.get('direction') == 'stopped'){
            this.changeDirection();
        } else {
            this.incrementProperty('frameCycle');
        }
    },

    animationCompleted(){
        return this.get('frameCycle') == this.get('framesPerMovement');
    },

    finalizeMove(){
        let direction = this.get('direction');
        this.set('x', this.nextCoordinate('x', direction));
        this.set('y', this.nextCoordinate('y', direction));

        this.set('frameCycle', 1);
    },

    pathBlockedInDirection(direction){
        let cellTypeInDirection = this.cellTypeInDirection(direction);
        return isEmpty(cellTypeInDirection) || cellTypeInDirection === 1;
    },

    cellTypeInDirection(direction){
        let nextX = this.nextCoordinate('x', direction);
        let nextY = this.nextCoordinate('y', direction);

        return this.get(`level.grid.${nextY}.${nextX}`);
    },

    nextCoordinate(coordinate, direction){
        return this.get(coordinate) + this.get(`directions.${direction}.${coordinate}`);
    }
}); 