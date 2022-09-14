import { useState } from "react";
import { open } from "@tauri-apps/api/dialog";

import { Button, Card } from "@nextui-org/react";


export default function () {
    const [hasProjects, setHasProjects] = useState(false);
    const [projects, setProjects] = useState<string[]>([]);

    const openDir = async () => {
        const selected = await open({
            directory: true,
            multiple: false,
        });

        if (selected !== null) {
            setProjects([...projects, selected as string]);
        }

        setHasProjects(true);
    }

    return (
        <div className="flex-grow">
            <h3>Projects</h3>

            {hasProjects ?
            <div>
                {projects.map(project => 
                    <Card className="px-3 max-w-[650px]">
                        <Card.Header><h3>Music Releases</h3></Card.Header>
                        <Card.Body>
                            lang: Python <br />
                            package manager: Poetry
                        </Card.Body>
                    </Card>
                )}

                <Button onClick={openDir} auto shadow>add new</Button> 

            </div>
                :
            <div className="flex flex-col items-center">
                <h3 className="mt-28">📦 no projects yet</h3>
               <Button onClick={openDir} auto shadow>add new</Button> 
            </div>    
            }
        </div>
    )
}