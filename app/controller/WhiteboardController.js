Ext.define('Whiteboard.controller.WhiteboardController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            canvas: '#canvas',
            addCircleButton: 'whiteboard #addCircleButton',
            addRectangleButton: 'whiteboard #addRectangleButton'
        },

        control: {
            canvas: {
                drag: 'draw',
                dragend: 'stop'
            },
            
            addCircleButton: {
                tap: 'addCircle'
            },
            
            addRectangleButton: {
                tap: 'addRectangle'
            }
        }
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

    drawRectangle: function(a) {
        var startX= a.event.offsetX-a.deltaX;
        var startY= a.event.offsetY-a.deltaY;

        var width= a.deltaX;
        var height= a.deltaY;

        var sprite= {
            type: 'rect',
            fill: '#79BB3F',
            height: height,
            width: width,
            x: startX,
            y: startY
        };
        this.paint(sprite);
    },
    
    addCircle: function(btn) {
        // Disable draw rectangle
        this.getAddRectangleButton().setUi('plain');

        if (this._activeAction == 'drawCircle') {
            btn.setUi('plain');
            this._activeAction= null;
        } else {            
            btn.setUi('normal');
            this._activeAction= 'drawCircle';
        }
    },
    
    addRectangle: function(btn) {
        // Disable draw circle
        this.getAddCircleButton().setUi('plain');
        
        if (this._activeAction == 'drawRectangle') {
            btn.setUi('plain');
            this._activeAction= null;
        } else {            
            btn.setUi('normal');
            this._activeAction= 'drawRectangle';
        }
    },

    paint: function(sprite) {
        var canvas= this.getCanvas();
        canvas.surface.remove(this.__lastSprite);
        this.__lastSprite= canvas.surface.add(sprite);
        canvas.repaint();
    },

    launch: function() {
    }
});
