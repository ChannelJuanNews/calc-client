import dispatcher from '../dispatcher'

export function addTab(title){
  dispatcher.dispatch({
    type  : "ADD_TAB",
    title : title
  })
}


export function deleteTab(hash){
    dispatcher.dispatch({
        type : "DELETE_TAB",
        hash : hash
    })
}

export function focusOnTab(hash){
    dispatcher.dispatch({
        type : "FOCUS_ON_TAB",
        hash : hash
    })
}

export function saveTab(hash){
    dispatcher.dispatch({
        type : "SAVE_TAB",
        hash : hash
    })
}
