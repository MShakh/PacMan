import EmberObject from '@ember/object';
import SharedStuff from '../mixins/shared-stuff';

export default EmberObject.extend(SharedStuff, {
    draw(){
        let x = this.get('x');
        let y = this.get('y');
        let radiusDivisor = 2;
        this.drawCircle(x, y, radiusDivisor, this.get('direction'));
    }
});