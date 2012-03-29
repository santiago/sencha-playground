Ext.define('Whiteboard.controller.WhiteboardController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            canvas: '#canvas',
            addCircleButton: 'whiteboard #addCircleButton',
            addRectangleButton: 'whiteboard #addRectangleButton',
            addTextButton: 'whiteboard #addTextButton',
            deleteButton: 'whiteboard #deleteButton'
        },

        control: {
            canvas: {
                tap: 'onTap',
                drag: 'draw',
                dragend: 'stop'
            },
            
            addCircleButton: {
                tap: 'addCircle'
            },
            
            addRectangleButton: {
                tap: 'addRectangle'
            },
            
            addTextButton: {
                tap: 'addText'
            },
            
            deleteButton: {
                tap: 'clear'
            }
        }
    },

    // Start drawing
    draw: function(a) {
        try {
            this[this._activeAction](a);
        } catch(e) {
            // We don't mind if action does not exist
        }
    },
    
    // Stop drawing
    stop: function() {
        this.__lastSprite= null;
    },
    
    onTap: function(a,b) {
        try {
            this[this._activeAction](a);
        } catch(e) {
            // We don't mind if action does not exist
        }        
    },

    tapText: function(a) {
        var self= this;
        Ext.Msg.prompt('Add Text', 'Write your text ...', function(action, text) {
            if(action!='ok') { return }
            var sprite= {
                type: 'text',
                text: text,
                x: a.event.offsetX,
                y: a.event.offsetY,
                font: "20px arial,sans-serif;"
            };
            var canvas= self.getCanvas();
            canvas.surface.add(sprite);
            canvas.repaint();
        });
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
        this.setAction('drawCircle', btn);
    },
    
    addRectangle: function(btn) {        
        this.setAction('drawRectangle', btn);
    },

    addText: function(btn) {        
        this.setAction('tapText', btn);
    },
    
    setAction: function(action, btn) {
        var current= this._activeAction;
        this.disableActions();
        if(current==action) { return }
        btn.setUi('normal');
        this._activeAction= action;
    },

    disableActions: function() {
        // Disable draw circle
        this.getAddCircleButton().setUi('plain');
        // Disable draw rectangle
        this.getAddRectangleButton().setUi('plain');
        // Disable add text
        this.getAddTextButton().setUi('plain');
        
        this._activeAction= null;
    },

    paint: function(sprite) {
        var canvas= this.getCanvas();
        canvas.surface.remove(this.__lastSprite);
        this.__lastSprite= canvas.surface.add(sprite);
        canvas.repaint();
    },
    
    clear: function() {
        var self= this;
        Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(action) {
            if(action=='yes') {
                self.getCanvas().surface.removeAll(true);
                self.getCanvas().repaint();
            }
        });
    },

    launch: function() {
    }
});
