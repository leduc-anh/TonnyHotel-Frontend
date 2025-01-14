import SceneItem from "./SceneItem"
import { cn } from '../../lib/utils'
import { useDispatch, useSelector } from "react-redux";
import { addScene } from "../../redux/actions";
import toast from "react-hot-toast";
import { useEffect } from "react";

function SceneList({ onCloseModal }) {
    const {SceneListData,isLoading} = useSelector((state) => state.scene);
    useEffect(() => {
        dispatch(isLoading(true));
        setTimeout(() => {
        dispatch(SceneListData([
            
            {
                name: "Scene 1",
                description: "Scene 1",
                image: "/background/scene1.gif",
            },
            {
                name: "Scene 2",
                description: "Scene 2",
                image: "/background/scene2.gif",
            },
            {
                name: "Scene 3",
                description: "Scene 3",
                image: "/background/scene3.gif",
            },
            {
                name: "Scene 4",
                description: "Scene 4",
                image: "/background/scene4.gif",
            },
            {
                name: "Scene 5",
                description: "Scene 5",
                image: "/background/scene5.gif",
            },
            {
                name: "Scene 6",
                description: "Scene 6",
                image: "/background/scene6.gif",
            },
            {
                name: "Scene 7",
                description: "Scene 7",
                image: "/background/scene7.gif",
            },
            {
                name: "Scene 8",
                description: "Scene 8",
                image: "/background/scene8.gif",
            },
            {
                name: "Scene 9",
                description: "Scene 9",
                image: "/background/scene9.gif",
            },
            {
                name: "Scene 10",
                description: "Scene 10",
                image: "/background/scene10.gif",
            },
            {
                name: "Scene 11",
                description: "Scene 11",
                image: "/background/scene11.gif",
            },
            {
                name: "Scene 12",
                description: "Scene 12",
                image: "/background/scene12.gif",
            },
            {
                name: "Scene 13",
                description: "Scene 13",
                image: "/background/scene13.gif",
            },
            {
                name: "Scene 14",
                description: "Scene 14",
                image: "/background/scene14.gif",
            },
            {
                name: "Scene 15",
                description: "Scene 15",
                image: "/background/scene15.gif",
            },
            {
                name: "Scene 16",
                description: "Scene 16",
                image: "/background/scene16.gif",
            },
            {
                name: "Scene 17",
                description: "Scene 17",
                image: "/background/scene17.gif",
            },
            {
                name: "Scene 18",
                description: "Scene 18",
                image: "/background/scene18.gif",
            },
            {
                name: "Scene 19",
                description: "Scene 19",
                image: "/background/scene19.gif",
            },
            {
                name: "Scene 20",
                description: "Scene 20",
                image: "/background/scene20.gif",
            },
        ]))}, 2000);
    }, [dispatch]);
    const dispatch = useDispatch();
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
