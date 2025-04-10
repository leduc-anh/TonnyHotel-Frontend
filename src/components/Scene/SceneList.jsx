import SceneItem from "./SceneItem"
import { cn } from '../../lib/utils'
import { useDispatch, useSelector } from "react-redux";
import { addScene } from "../../redux/actions";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setLoading } from "../../redux/actions";
function SceneList({ onCloseModal }) {
    
    const { SceneListData, isLoading } = useSelector((state) => state.scene);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoading(true));
        const timer = setTimeout(() => {
            dispatch(setLoading(false));
        }, 2000);
        return () => clearTimeout(timer);
    }, [dispatch]);
       const handleAddScene = (imageUrl) => {
        dispatch(addScene({ image: imageUrl })); 
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please select an image file.");
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                handleAddScene(reader.result); 
                toast.success("Added scene successfully!");
            };
            reader.readAsDataURL(file);
        }
    };
    return (

        <ul className={cn(" flex gap-2 flex-wrap overflow-y-auto max-h-[75vh] scroll-smooth items-center justify-center mt-6 ")} >
            {isLoading ? <p>Loading...</p> : SceneListData.map((scene) => (
                <SceneItem key={scene.name} name={scene.name} image={scene.image} isCustom={scene.isCustom} />
            ))}
             <li
                className={cn(
                    "cursor-pointer m-2 text-center transition-all duration-500 ease-in-out rounded-sm border",
                )}
            >
                <label className="cursor-pointer relative top-1">
                    <img className={cn("h-[7rem] w-[12rem] p-1")} src='/background/default.jpg' alt="Add image"></img>
                    <p className={cn("text-sm pb-3 text-white")}>Add image</p>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            </li>
        </ul>

    )
}

export default SceneList
