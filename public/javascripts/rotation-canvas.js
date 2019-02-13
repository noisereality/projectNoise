window.onload = init

        var canvasDimensions = {
            w: undefined,
            h: undefined
        }

        var context
        var angle = 0

        function init() {
            var canvasDOMEl = document.querySelector("#canvas")
            context = canvasDOMEl.getContext("2d");
            canvasDimensions.w = window.innerWidth
            canvasDimensions.h = window.innerHeight
            canvasDOMEl.setAttribute("width", canvasDimensions.w)
            canvasDOMEl.setAttribute("height", canvasDimensions.h)

            beware();
            setInterval(beware,120);
        }

        function beware() {

            context.clearRect(0, 0, canvasDimensions.w, canvasDimensions.h);
            var nSquares = 10
            for (var square = 0; square <= 50 * nSquares; square += 6) {
                
                context.save();
                
                angle += 360 / nSquares
                context.translate(canvasDimensions.w / 2, canvasDimensions.h / 2)
                context.rotate(angle * Math.PI / 180);
                context.strokeStyle = "#ADB0AB";
                context.strokeRect(-(square / 2), -(square / 2), square, square);
                
                context.restore();
            }

        }