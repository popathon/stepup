$( document ).ready(function() {
    steps = new Steps()
    steps.on("sync", function(eventName) {
      var step = steps.current()

      $('#play').on("click", function(evt){
        pop = Popcorn("#video");
        pop.on("timeupdate", function(){
          $('#current-time').html(pop.currentTime())
        })
        pop.cue( step.get("end_at"), function() {
          this.currentTime( step.get("start_at") );
        });
        pop.currentTime( step.get("start_at") );
        pop.play();
      })

      $('#stop').on("click", function(evt){
        pop.pause()
      })

      $('#reset').on("click", function(evt){
        pop.currentTime(0)
        console.log(pop.currentTime)
      })

      $('#next').on("click", function(evt){
        step = steps.shift()
        pop.cue( step.get("end_at"), function() {
          this.currentTime( step.get("start_at") );
        });
        pop.currentTime( step.get("start_at") );
        pop.play();
      })

    });
    steps.fetch()


});