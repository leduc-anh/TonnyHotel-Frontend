import { ADD_SCENE, DELETE_SCENE, SET_SCENE, SET_LOADING } from "../constantsType/actionType"
import { SceneListData } from "../../components/Scene/SceneList"
const INITIAL_STATE = {
    SceneListData: SceneListData,
    selectedScene: SceneListData[0],
    isLoading: true,
};

const sceneReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SCENE:
            const updatedState = {
                ...state,
                selectedScene: action.payload,
                isLoading: false,
            };
            return updatedState;
        case ADD_SCENE: {

            const currentMaxIndex = state.SceneListData.reduce((max, scene) => {
                const match = scene.name.match(/Scene (\d+)/);
                return match ? Math.max(max, parseInt(match[1], 10)) : max;
            }, 0);

            const newScene = {
                name: `Scene ${currentMaxIndex + 1}`,
                description: `Scene ${currentMaxIndex + 1}`,
                image: action.payload.image,
                isCustom: true,
            };

            return {
                ...state,
                SceneListData: [...state.SceneListData, newScene],
            };
        }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload, 
            };
        case DELETE_SCENE:
            const indexToDelete = state.SceneListData.findIndex(item => item.name === action.payload);
            const updatedList = state.SceneListData.filter((item) => item.name !== action.payload);
            let newSelectedScene = state.selectedScene;
            if (state.selectedScene.name === action.payload) {
                if (indexToDelete > 0) {
                    newSelectedScene = state.SceneListData[indexToDelete - 1];
                }
            }
            return {
                ...state,
                SceneListData: updatedList,
                selectedScene: newSelectedScene,
            };
        default:
            return state;
    }
};
export default sceneReducer;

