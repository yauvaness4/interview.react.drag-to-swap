import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PrintPhoto } from "./printPage/styles";
import PhotoPreview from "./preview";

export function SortableItem(props) {
    const {
        attributes,
        transform,
        transition,
        listeners,
        setNodeRef
    } = useSortable({ id: props.image })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <PrintPhoto ref={setNodeRef} style={style} {...attributes} {...listeners} key={props.image} id={props.id}>
            <PhotoPreview image={props.image}/>
        </PrintPhoto>

    )
}

