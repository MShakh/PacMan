import Component from '@ember/component';
import { later } from '@ember/runloop';
import {
    bindKeyboardShortcuts,
    unbindKeyboardShortcuts
  } from 'ember-keyboard-shortcuts';

import SharedStuff from '../mixins/shared-stuff';
import Pac from '../models/pac';
import Level from '../models/level';


 export default Component.extend(SharedStuff, {
   init() {
    this._super(...arguments);

    this.score = 0;
    this.levelNumber = 1;

    this.keyboardShortcuts = {
      up() { this.set('pac.intent', 'up');},
      down() { this.set('pac.intent','down');},
      left() { this.set('pac.intent','left');},
      right() { this.set('pac.intent','right');},
    };
   },

  didInsertElement(){
    let level = Level.create();
    this.set('level', Level.create());
    let pac = Pac.create({level: level});
    this.set('pac', pac);
    this.loop();
    bindKeyboardShortcuts(this);
  },

  drawWall(x, y){
    let ctx = this.get('ctx');
    let squareSize = this.get('level.squareSize');

    ctx.fillStyle = '#000';
    ctx.fillRect(x * squareSize,
                  y * squareSize,
                  squareSize,
                  squareSize);
  },

  drawPellet(x, y){
    let radiusDivisor = 6;
    this.drawCircle(x, y, radiusDivisor, 'stopped');
  },

  drawGrid(){
    let grid = this.get('level.grid');
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if(cell == 1)
          this.drawWall(columnIndex, rowIndex);
        if(cell == 2)
          this.drawPellet(columnIndex, rowIndex);
      });
    });
  },
  
  clearScreen(){
    let ctx = this.get('ctx');
    ctx.clearRect(0, 0, this.get('level.pixelWidth'), this.get('level.pixelHeight'));
  },

  loop(){
    this.get('pac').move();

    this.processAnyPellets();

    this.clearScreen();
    this.drawGrid();
    this.get('pac').draw();

    later(this, this.loop, 1000/60);
  },

  processAnyPellets(){
    let x = this.get('pac.x');
    let y = this.get('pac.y');
    let grid = this.get('level.grid');
    let level = this.get('level');

    if(grid[y][x] == 2){
      grid[y][x] = 0;
      this.incrementProperty('score');

      if(level.isComplete()){
        this.incrementProperty('levelNumber');
        this.restartLevel();
      }
    }
  },

  restart(){
    this.get('pac').restart();
    this.get('level').restart();
  },

  willDestroyElement() {
    this._super(...arguments);
    unbindKeyboardShortcuts(this);
  }
});
