
export const setScene = (scene) => ({
    type: "SET_SCENE",
    payload: scene
});
export const addScene = (scene) => ({
    type: "ADD_SCENE",
    payload: scene
})
export const deleteScene = (scene) => ({
    type: "DELETE_SCENE",
    payload: scene
})
export const setMusic = (name, des, url) => ({
    type: "SET_MUSIC",
    payload: { name, des, url },
})
export const setVolume = (volume) => ({
    type: "SET_VOLUME",
    payload: volume,
})
export const setToggleMute = () => ({
    type: "SET_TOGGLE_MUTE",
})
export const setPlaying = (playing) => ({
    type: "SET_PLAYING",
    payload: playing,
})
export const setPause = (pause) => ({
    type: "SET_PAUSE",
    payload: pause,
})
export const setNext = () => ({
    type: "SET_NEXT",
    payload: null,
})
export const setPrevious = () => ({
    type: "SET_PREVIOUS",
    payload: null,
})
export const setSelectedDate = (date) => ({
    type: "SET_SELECTED_DATE",
    payload: date,
  });
  
  export const setEvent = ({ date, event }) => ({
    type: "SET_EVENT",
    payload: { date, event },
  });
  export const deleteEvent = (date) => ({
    type: "DELETE_EVENT",
    payload: date,
});
export const editEvent = ({ date, event }) => ({
    type: "EDIT_EVENT",
    payload: { date, event },
})
export const addTodoList = (todo) => ({
    type: "ADD_TODO_LIST",
    payload: todo
})
export const editTodoList = (todo) => ({
    type: "EDIT_TODO_LIST",
    payload: todo
})
export const deleteTodoList = (todo) => ({
    type: "DELETE_TODO_LIST",
    payload: todo
})
export const ToggleTodoList = (id) => ({
    type: "TOGGLE_TODO_LIST",
    payload: id
})
export const startPomodoro = () => ({
    type: "START_POMODORO",
});

export const stopPomodoro = () => ({
    type: "STOP_POMODORO",
});

export const resetPomodoro = () => ({
    type: "RESET_POMODORO",
});

export const setPomodoroTime = (time) => ({
    type: "SET_POMODORO_TIME",
    payload: time,
});
export const togglePomodoroMode = (isPomodoro) => ({
    type: "TOGGLE_POMODORO_MODE",
    payload: isPomodoro,
});
export const setVolumeSound = (id, volume) => ({
    type: "SET_SOUND_VOLUME",
    payload: { id, volume }
});
export const toggleMuteSound = (id) => ({
    type: "TOGGLE_MUTE_SOUND",
    payload: { id }
})
export const toggleFullScreen = () => ({
    type: "TOGGLE_FULLSCREEN",
  });
  export const setVideoUrl = (url) => ({
    type: "SET_VIDEO_URL",
    payload: url,
});

export const togglePlaying = () => ({
    type: "TOGGLE_PLAYING_VIDEO",
});

export const addVideoUrl = (url, name) => ({
    type:"ADD_VIDEO_URL",
    payload: { url, name },
});

export const deleteVideoUrl = (url) => ({
    type: "DELETE_VIDEO_URL",
    payload: url,
});
export const setLoading = (loading) => ({
    type: "SET_LOADING",
    payload: loading,
});