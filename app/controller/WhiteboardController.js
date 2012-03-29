Ext.define('Whiteboard.controller.WhiteboardController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            canvas: '#canvas',
            addCircleButton: 'whiteboard #addCircleButton'
        },

        control: {
            canvas: {
                drag: 'draw',
                dragend: 'stop',
                tap: 'putSprite'
            },
            
            addCircleButton: {
                tap: 'addCircle'
            }
        }
    },
    
    putSprite: function(a) {
        var canvas= this.getCanvas();
        canvas.surface.add({
            type: 'circle',
            fill: '#000000',
            radius: 4,
            x: a.event.offsetX,
            y: a.event.offsetY
        });
        canvas.repaint();
    },

    draw: function(a) {
        try {
            this[this._activeAction](a);
        } catch(e) {
            // The user has not selected a sprite to draw
        }
    },
    
    stop: function() {
        this.__lastSprite= null;
    },
    
    drawPath: function() {
        var canvas= this.getCanvas();
        canvas.surface.add({
            type: 'circle',
            fill: '#79BB3F',
            radius: 4,
            x: a.event.offsetX,
            y: a.event.offsetY
        });
        canvas.repaint();
    },

    drawCircle: function(a) {
        var startX= a.event.offsetX-a.deltaX;
        var startY= a.event.offsetY-a.deltaY;

        var radius= Math.sqrt(Math.pow(a.deltaX,2), Math.pow(a.deltaY,2));
        var sprite= {
            type: 'circle',
            fill: '#79BB3F',
            radius: radius,
            x: startX,
            y: startY
        };
        this.paint(sprite);
    },

    addCircle: function(btn) {
        if (this._activeAction == 'drawCircle') {
            btn.setUi('plain');
            this._activeAction= null;
        } else {            
            btn.setUi('normal');
            this._activeAction= 'drawCircle';
        }
    },

    paint: function(sprite) {
        var canvas= this.getCanvas();
        canvas.surface.remove(this.__lastSprite);
        this.__lastSprite= canvas.surface.add(sprite),
        canvas.repaint();
    },

    launch: function() {
    }
});
