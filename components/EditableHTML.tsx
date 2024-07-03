import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { useState } from 'react'

interface EditableHTMLProps {
    htmlContent: string | null
}

export default function EditableHTML({ htmlContent}: EditableHTMLProps){

    const [content, setContent] = useState<string | null>(htmlContent)

    const handleChange = (e: ContentEditableEvent) => {
        setContent(e.target.value)
    }

    return(
        <div className='bg-gray-300 flex-1 rounded-lg mb-4 p-4 overflow-auto w-full'>
            {content && <ContentEditable html = {content} disabled = {false} onChange={handleChange}/>}
        </div>
    )
}