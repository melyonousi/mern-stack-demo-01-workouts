import { createContext, useReducer } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER': 
        
        return { user: action.payload.user }
        case 'LOGOUT_USER': return { user: null }
        default: return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null })

    console.log('AuthContextState:', state)

    return <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
}