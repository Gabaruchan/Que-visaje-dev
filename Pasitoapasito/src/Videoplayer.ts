import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Play Pause Video',

  schema: {
    // @required
    videoPlayer: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const {videoPlayer} = schemaAttribute.get(eid)

        if (!videoPlayer) {
          console.warn('Play Pause Video: No se ha asignado una entidad de video.')
          return
        }

        if (!ecs.VideoControls.has(world, videoPlayer)) {
          console.warn(
            'Play Pause Video: La entidad asignada no tiene VideoControls.'
          )
          return
        }

        ecs.VideoControls.mutate(world, videoPlayer, (c) => {
          c.paused = !c.paused
        })
      })
  },
})