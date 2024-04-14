"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import toast from "react-hot-toast"; 
import { Course } from "@prisma/client";


import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
  
interface ImageFormProps {
    initialData: Course
    courseId: string;
}

const formSchema = z.object({
    imageUrl: z.string().min(1,{
        message: "Image  is required",
    }),
});

export const ImageForm = ({
    initialData,
    courseId
}: ImageFormProps ) => {
    const router = useRouter();
    
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);
      
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated"); 
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
         
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4"> 
            <div className="font-medium flex items-center justify-between">
                Course image 
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.imageUrl && (
                        <>
                        <PlusCircle className="h-4 2-4 mr-2" />
                        Add an image 
                        </>
                    )}
                    {!isEditing &&  initialData.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit image
                        </>
                    )} 
                </Button>
            </div> 
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" /> 
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image  
                            alt="Upload"
                            fill
                            src={initialData.imageUrl}
                            className="object-cover rounded-md" 
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if(url) {
                                onSubmit({imageUrl: url});
                            } 
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 a spect ratio recommended
                    </div>
                </div>
            )}
        </div>
    )
}