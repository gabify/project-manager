import {createContext, useReducer} from 'react'

export const ProjectContext = createContext()

export const projectReducer = (state, action) =>{
    switch(action.type){
        case 'SET_PROJECT':
            return{
                projects: action.payload
            }
        case 'CREATE_PROJECT':
            return{
                projects: [action.payload, ...state.projects]
            }
        default:
            return state
    }
}

export const ProjectContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(projectReducer, {
        projects: [] //change to null if backend is implemented
    })

    return (
        <ProjectContext.Provider value={{...state, dispatch}}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContextProvider;