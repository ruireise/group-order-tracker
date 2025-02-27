import Image from "next/image";

export default function Folders(props){

    return(
        <div key={props.folderName} className="relative p-8 h-44 flex items-center justify-center">
            <Image src="/folders.png" alt="folder" width={300} height={250} className="object-contain"/>
            <span className="bottom-3 left-12 absolute text-white">{props.folderName}</span>
        </div>
    );
}