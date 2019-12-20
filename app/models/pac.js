import EmberObject from '@ember/object';
import SharedStuff from '../mixins/shared-stuff';
import Movement from '../mixins/movement';

export default EmberObject.extend(SharedStuff, Movement, {
    init(){
        this._super(...arguments);
        this.direction = 'down';
        this.intent = 'down';

        this.level = this.get('level');
        this.x = this.get('x');
        this.y = this.get('y');
        this.pac = this.get('pac');
    },

    draw(){
        let x = this.get('x');
        let y = this.get('y');
        let radiusDivisor = 2;
        this.drawCircle(x, y, radiusDivisor, this.get('direction'), '#FE0');
    },

    changeDirection(){
        let intent = this.get('intent');
        if(this.pathBlockedInDirection(intent)){
            this.set('direction', 'stopped');
        } else {
            this.set('direction', intent);
        }        
    }, 

    restart(){
        this.set('x', this.get('level.startingPac.x'));
        this.set('y', this.get('level.startingPac.y'));
        this.set('frameCycle', 0);
        this.set('direction', 'stopped');
    }
});